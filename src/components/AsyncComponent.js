import React, { Component } from 'react'
import { injectAsyncReducer } from '../store/createStore'
/* eslint-disable */
export default function asyncComponent(importComponent, store, reducer) {
  if (store) {
    injectAsyncReducer(store, reducer[0], reducer[1])
  }
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
