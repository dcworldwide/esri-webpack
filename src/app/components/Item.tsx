import * as React from "react";

const style = {
    container: {
        display: 'flex',
        alignContent: 'center',
        backgroundColor: 'cyan'
    }
}

export interface ItemViewProps {  }

export class ItemView extends React.Component<ItemViewProps, {}> {
    render() {
        return <div style={style.container}>
           <h2>Child</h2>
        </div>
    }
}