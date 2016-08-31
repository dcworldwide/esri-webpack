import * as React from "react";
import {ItemView} from './Item'

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        width: '50%',
        backgroundColor: 'salmon'
    }
}

export interface PanelViewProps {
}

export class PanelView extends React.Component<PanelViewProps, {}> {

    renderCount: number = 0

    componentDidMount() {
        console.log(`Panel mounted`)
    }

    render() {
        this.renderCount++
        console.log(`Panel rendered. ${this.renderCount}`)
        return <div style={style.container}>
            <h1>Panel ({this.renderCount})</h1>
            <ItemView label="A" colour="red" />
            <ItemView label="B" colour="yellow" />
            <ItemView label="C" colour="orange" />
        </div>
    }
}