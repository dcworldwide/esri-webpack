import * as React from "react";
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { resetErrorMessage } from '../actions'
import {MapView} from '../components/Map'
import {EntityView} from '../components/Entity'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
  }
}

export interface AppProps {
  // Injected by React Redux
  entity: any,
  errorMessage?: string,
  resetErrorMessage: Function,
  // Injected by React Router
  children: Node
}

class App extends React.Component<AppProps, {}> {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    // this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    // browserHistory.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
          onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { entity, children } = this.props
    return (
      <div style={style.container}>
        <EntityView entity={entity} />
        <MapView center="3.955, 59.338" />
        {this.renderErrorMessage() }
        {children}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    entity: state.entity,
    errorMessage: state.errorMessage
  }
}

// export default connect(mapStateToProps, {
//   resetErrorMessage
// })(App)

export default connect(mapStateToProps, {})(App)