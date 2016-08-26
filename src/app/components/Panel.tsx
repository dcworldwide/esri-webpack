import * as React from "react";

const style = {
    container: {
        display: 'flex',
        alignContent: 'center',
        width: '30%',
        backgroundColor: 'salmon'
    }
}

export interface PanelViewProps {  }

export class PanelView extends React.Component<PanelViewProps, {}> {
    render() {
        return <div style={style.container}>
           <h1>LHS dd</h1>
        </div>
    }
}