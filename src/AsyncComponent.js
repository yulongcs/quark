import React, { Component } from 'react'
import { injectAsyncReducer } from './store'

export default function asyncComponent(importComponent, store, reducer) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component
      })
      if (store) {
        injectAsyncReducer(store, reducer[0], reducer[1])
      }
    }

    render() {
      const C = this.state.component
      return C
        ? <C {...this.props} />
        : null
    }
  }
  return AsyncComponent
}
