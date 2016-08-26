import * as React from "react";
import {ItemView} from './Item'

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        width: '30%',
        backgroundColor: 'salmon'
    }
}

export interface PanelViewProps {
  }

export class PanelView extends React.Component<PanelViewProps, {}> {
    render() {
        return <div style={style.container}>
           <h1>Panel</h1>
           <ItemView label="A" colour="pink" />
           <ItemView label="B" colour="red" />
           <ItemView label="C" colour="purple" />
        </div>
    }
}