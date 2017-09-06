import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeProjects, loadProjects } from '../actions'

class Projects extends Component {
  componentDidMount() {
    this.props.loadProjects()
  }
  render() {
    return (
      <h2>Home Page</h2>
    )
  }
}

Projects.propTypes = {
  loadProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => (
  {
    x: state.projects
  }
)
const mapDispatchToProps = dispatch => (
  {
    changeProjects: () => { dispatch(changeProjects()) },
    loadProjects: () => { dispatch(loadProjects()) }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
