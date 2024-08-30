/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { ComponentType, SvelteComponent } from 'svelte'

import Root from './Root.svelte'

type Payload = Record<string, unknown> | null | void | undefined

export type Renderer<I extends SvelteComponent> = {
  get(element: Element): I | undefined
  mount(element: Element, svelteComponent: ComponentType<I>, payload: Payload, onRendered: () => void): I
  update(app: I, payload: Payload): void
  unmount(element: Element): void
}

export function getRenderer(): Renderer<SvelteComponent> {
  const instances = new Map<Element, SvelteComponent>()

  return {
    get(element) {
      return instances.get(element)
    },
    mount(element, svelteComponent, payload, onRendered) {
      const app = new Root({
        target: element,
        props: {
          component: svelteComponent,
          // eslint-disable-next-line no-undefined
          props: payload || undefined,
          onRendered
        }
      })

      instances.set(element, app)

      return app
    },
    update(app, payload) {
      app.$set({ props: { ...app.props, ...payload } })
    },
    unmount(element) {
      const app = instances.get(element)

      if (app) {
        app.$destroy()
        instances.delete(element)
      }
    }
  }
}
