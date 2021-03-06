import * as React from "react";
import {RaisedButton} from 'material-ui';

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        width: '40%',
        backgroundColor: 'orange'
    }
}

export interface EntityEditViewProps {
    entity: any // TODO generics
}

export class EntityEditView extends React.Component<EntityEditViewProps, {}> {

    componentDidMount() {
        
    }

    render() {
        return <div style={style.container}>
            <RaisedButton label="Default" />
        </div>
    }
}