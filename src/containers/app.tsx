import * as React from "react";
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {MapView} from '../components/Map'
import Map = require("esri/map");
import {EntityView} from '../components/Entity'
import {EntityCreateView} from '../components/EntityCreate'
import SplitPane = require('react-split-pane')
var config = require('config')

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
  // Injected by React Router
  children: Node
}

export interface AppState {
  map: Map,
  config: any
}

class App extends React.Component<AppProps, AppState> {

  constructor(props) {
    super(props)
    this.state = {
      map: undefined,
      config: config
    }
  }

  onMapLoaded(map: Map) {
    this.setState({ map: map })
  }

  render() {
    const { entity, children } = this.props
    return (
      <div style={style.container}>
        <SplitPane split="vertical" minSize={650}>
          <EntityCreateView
            config={this.state.config}
            map={this.state.map} />
          <MapView
            config={this.state.config}
            onMapLoaded={this.onMapLoaded.bind(this) } />
        </SplitPane>
      </div>
    )
  }
}

          // <EntityView
          //   entity={entity}
          //   config={this.state.config}
          //   map={this.state.map} />

function mapStateToProps(state, ownProps) {
  return {
    entity: state.entity
  }
}

export default connect(mapStateToProps, {})(App)