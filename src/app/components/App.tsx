import * as React from "react";
import { MapView } from "./Map";
import { PanelView } from "./Panel";

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1
    }
}

export interface AppProps {  }

export class App extends React.Component<AppProps, {}> {
    render() {
        return <div style={style.container}>
            <PanelView />
            <MapView center="3.955, 59.338" />
        </div>
    }
}
