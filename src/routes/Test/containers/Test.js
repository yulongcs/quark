import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeTest, loadTest } from '../actions'

class Test extends Component {
  componentDidMount() {
    this.props.loadTest()
  }
  render() {
    return (
      <h2>Home Page</h2>
    )
  }
}

Test.propTypes = {
  loadTest: PropTypes.func.isRequired
}

const mapStateToProps = state => (
  {
    x: state.test
  }
)
const mapDispatchToProps = dispatch => (
  {
    changeTest: () => { dispatch(changeTest()) },
    loadTest: () => { dispatch(loadTest()) }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Test)
