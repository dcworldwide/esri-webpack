import * as React from "react";
import * as ReactRedux from 'react-redux'
import {Route} from "react-router";
// import routes from '../routes'
import DevTools from './devTools'
import * as ReactRouter from 'react-router'

const Provider = ReactRedux.Provider
const Router = ReactRouter.Router

import App from './app'

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1
    }
}

export interface RootProps { 
    store: any,
    history: any
}

export default class Root extends React.Component<RootProps, {}> {
    render() {
        const { store, history } = this.props
        return (
            <Provider store={store}>
                <div style={style.container}>
                    <Router history={history}>
                        <Route path="/" component={App}></Route>
                    </Router>
                    <DevTools />
                </div>
            </Provider>
        )
    }
}

// export default root
// const root = (process.env.NODE_ENV === 'production') ? require('./root.prod') : require('./root.dev')
// export default root

// <Router history={history} routes={routes} />
// <DevTools />





// import Router = require('react-router')

// import UserPage from './containers/userPage'
// import RepoPage from './containers/repoPage'

// let routes =  (
//   <Route path="/" component={App}>
//   </Route>
// )

// export default routes


    // <Route path="/:login/:name"
    //        component={RepoPage} />
    // <Route path="/:login"
    //        component={UserPage} />