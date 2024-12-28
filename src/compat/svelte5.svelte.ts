import { mount as svelteMount, unmount as svelteUnmount } from 'svelte'

import Root from '../Root.svelte'

export function mount(element: any, component: any, payload: any, onRendered: any) {
  const props = $state({
    component,
    // eslint-disable-next-line no-undefined
    props: payload || undefined,
    onRendered
  })
  const app = svelteMount(Root, {
    target: element,
    props
  })

  app._props = props

  return app
}

export function update(app: any, payload: any) {
  app._props.props = { ...app._props.props, ...payload }
}

export function unmount(app: any) {
  void svelteUnmount(app)
}

