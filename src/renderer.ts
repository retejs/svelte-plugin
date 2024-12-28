/* eslint-disable @typescript-eslint/no-invalid-void-type */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mount, unmount, update } from 'process.env.COMPAT'
import { Component } from 'svelte'

type Payload = Record<string, unknown> | null | void | undefined

export type Renderer<I extends Record<string, any>> = {
  get(element: Element): I | undefined
  mount(element: Element, svelteComponent: Component, payload: Payload, onRendered: () => void): I
  update(app: I, payload: Payload): void
  unmount(element: Element): void
}

export function getRenderer(): Renderer<Record<string, any>> {
  const instances = new Map<Element, Record<string, any>>()

  return {
    get(element) {
      return instances.get(element)
    },
    mount(element, svelteComponent, payload, onRendered) {
      const app = mount(element, svelteComponent, payload, onRendered)

      instances.set(element, app)

      return app
    },
    update(app, payload) {
      update(app, payload)
    },
    unmount(element) {
      const app = instances.get(element)

      if (app) {
        unmount(app)
        instances.delete(element)
      }
    }
  }
}
