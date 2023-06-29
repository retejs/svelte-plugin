import type { BaseSchemes } from 'rete'
import { BaseAreaPlugin } from 'rete-area-plugin'

import type { RenderPreset } from '../types'
import Pins from './components/Pins.svelte'
import type { PinsRender, Translate } from './types'

type Props = {
  translate?: Translate
  contextMenu?: (id: string) => void
  pointerdown?: (id: string) => void
}

export function setup<Schemes extends BaseSchemes, K extends PinsRender>(props?: Props): RenderPreset<Schemes, K> {
  const getProps = () => ({
    menu: props?.contextMenu || (() => null),
    translate: props?.translate || (() => null),
    down: props?.pointerdown || (() => null)
  })

  return {
    update(context) {
      if (context.data.type === 'reroute-pins') {
        return {
          ...getProps(),
          pins: context.data.data.pins
        }
      }
    },
    render(context, plugin) {
      if (context.data.type === 'reroute-pins') {
        const area = plugin.parentScope<BaseAreaPlugin<Schemes, PinsRender>>(BaseAreaPlugin)

        return {
          component: Pins,
          props: {
            ...getProps(),
            getPointer: () => area.area.pointer,
            pins: context.data.data.pins
          }
        }
      }
    }
  }
}
