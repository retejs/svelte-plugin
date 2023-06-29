import type { ConnectionId } from 'rete'

import type { RenderSignal } from '../../types'

type Position = {
  x: number
  y: number
}
export type Translate = (id: string, dx: number, dy: number) => void

export type Pin = {
  id: string
  position: Position
  selected?: boolean
}
export type PinData = {
  id: ConnectionId
  pins: Pin[]
}

export type PinsRender =
  | RenderSignal<'reroute-pins', { data: PinData }>
