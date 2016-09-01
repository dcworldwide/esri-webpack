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

    renderCount : number = 0

    componentDidMount() {
        console.log(`Item ${this.props.label} mounted`)
    }

    render() {
        this.renderCount++
        console.log(`Item ${this.props.label} rendered. ${this.renderCount}`)
        return <div style={style.container}>
           <h2 style={{color: this.props.colour || "olive"}}>{this.props.label} ({this.renderCount})</h2>
        </div>
    }
}
