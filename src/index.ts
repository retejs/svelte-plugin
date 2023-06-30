import { BaseSchemes, CanAssignSignal, Scope } from 'rete'
import type { SvelteComponent } from 'svelte'

import type { RenderPreset } from './presets/types'
import { getRenderer, Renderer } from './renderer'
import type { Position, RenderSignal } from './types'

export * as Presets from './presets'
export type { ClassicScheme, SvelteArea2D } from './presets/classic/types'
export type { RenderPreset } from './presets/types'
export { default as Ref } from './Ref.svelte'

export type Produces<Schemes extends BaseSchemes> =
  | { type: 'connectionpath', data: { payload: Schemes['Connection'], path?: string, points: Position[] } }

type Requires<Schemes extends BaseSchemes> =
  | RenderSignal<'node', { payload: Schemes['Node'] }>
  | RenderSignal<'connection', { payload: Schemes['Connection'], start?: Position, end?: Position }>
  | { type: 'unmount', data: { element: HTMLElement } }

export class SvelteRenderPlugin<Schemes extends BaseSchemes, T = Requires<Schemes>> extends Scope<Produces<Schemes>, [Requires<Schemes> | T]> {
  renderer: Renderer<SvelteComponent>
  presets: RenderPreset<Schemes, T>[] = []
  owners = new WeakMap<HTMLElement, RenderPreset<Schemes, T>>()

  constructor() {
    super('vue-render')
    this.renderer = getRenderer()

    this.addPipe(context => {
      if (!context || typeof context !== 'object' || !('type' in context)) return context

      if (context.type === 'unmount') {
        this.unmount(context.data.element)
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context
        }
        if (this.mount(context.data.element, context as T)) {
          return {
            ...context,
            data: {
              ...context.data,
              filled: true
            }
          } as typeof context
        }
      }

      return context
    })
  }

  setParent(scope: Scope<Requires<Schemes> | T>): void {
    super.setParent(scope)

    this.presets.forEach(preset => {
      if (preset.attach) preset.attach(this)
    })
  }

  private unmount(element: HTMLElement) {
    this.owners.delete(element)
    this.renderer.unmount(element)
  }

  apps = new Map<HTMLElement, Node>()

  private mount(element: HTMLElement, context: T) {
    const existing = this.renderer.get(element)
    const parent = this.parentScope()

    if (existing) {
      this.presets.forEach(preset => {
        if (this.owners.get(element) !== preset) return
        const result = preset.update(context as Extract<T, { type: 'render' }>, this)

        if (result) {
          this.renderer.update(existing, result)
        }
      })
      return true
    }

    for (const preset of this.presets) {
      const result = preset.render(context as Extract<T, { type: 'render' }>, this)

      if (!result) continue

      this.renderer.mount(
        element,
        result.component,
        result.props,
        () => parent?.emit({ type: 'rendered', data: (context as Requires<Schemes>).data } as T)
      )

      this.owners.set(element, preset)
      return true
    }
    return false
  }

  public addPreset<K>(preset: RenderPreset<Schemes, CanAssignSignal<T, K> extends true ? K : 'Cannot apply preset. Provided signals are not compatible'>) {
    const local = preset as RenderPreset<Schemes, T>

    if (local.attach) local.attach(this)
    this.presets.push(local)
  }
}
