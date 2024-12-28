import Root from '../Root.svelte'

export function mount(element: any, component: any, payload: any, onRendered: any) {
  const app = new Root({
    target: element,
    props: {
      component,
      // eslint-disable-next-line no-undefined
      props: payload || undefined,
      onRendered
    }
  })

  return app
}

export function update(app: any, payload: any) {
  app.$set({ props: { ...app.props, ...payload } })
}

export function unmount(app: any) {
  app.$destroy()
}

