import * as React from "react";

const style = {
    container: {
        display: 'flex',
        alignContent: 'center',
        backgroundColor: 'cyan'
    }
}

export interface ItemViewProps {  
    label: string,
    colour: string
}

export class ItemView extends React.Component<ItemViewProps, {}> {
    render() {
        console.log(`Item ${this.props.label} rendered`)
        return <div style={style.container}>
           <h2 style={{color: this.props.colour || "olive"}}>{this.props.label}</h2>
        </div>
    }
}