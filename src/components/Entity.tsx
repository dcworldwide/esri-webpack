import * as React from "react";
import {Tabs, Tab, TextField} from 'material-ui';
import FixedDataTable = require('fixed-data-table');
// const Table = FixedDataTable.Table
// const Column = FixedDataTable.Column
// const Cell = FixedDataTable.Cell

const {Table, Column, Cell} = FixedDataTable

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        width: '40%',
        backgroundColor: 'orange'
    },
    tabHeader: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
}

export interface EntityViewProps {
    entity: any // TODO generics
}

export class EntityView extends React.Component<EntityViewProps, {}> {

    componentDidMount() {
        console.log(`Entity mounted`)
    }

    render() {

        let {entity} = this.props

        if (entity.isFetching) {
            return <div style={style.container}>Loading</div>
        }

        // Table data as a list of array.
        const rows = [
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3'],
            // .... and more
        ];

//   <Table
//                             rowHeight={50}
//                             rowsCount={rows.length}
//                             width={5000}
//                             height={5000}
//                             headerHeight={50}>
//                             <Column
//                                 header={<Cell>Col 1</Cell>}
//                                 cell={<Cell>Column 1 static content</Cell>}
//                                 width={2000}
//                                 />
//                             <Column
//                                 header={<Cell>Col 1</Cell>}
//                                 cell={<Cell>Column 1 static content</Cell>}
//                                 width={2000}
//                                 />
//                         </Table>

        return <div style={style.container}>
            <h1>{entity.entityId}</h1>
            <Tabs>
                <Tab label="Permits" >
                    <div>
                      
                        <Tabs>
                            <Tab label="Details" >
                                <div>
                                    <TextField
                                        id="lga"
                                        value={entity.data.Permit[0].Lga} />
                                </div>
                            </Tab>
                            <Tab label="Stock Schedule" >
                                <div>
                                    <h2 style={style.tabHeader}>Tab Two</h2>
                                    <p>
                                        This is another example tab.
                                    </p>
                                </div>
                            </Tab>
                            <Tab label="Additional Conditions">
                                <div>
                                    <h2 style={style.tabHeader}>Tab Three</h2>
                                    <p>
                                        This is a third example tab.
                                    </p>
                                </div>
                            </Tab>
                            <Tab label="Approval">
                                <div>
                                    <h2 style={style.tabHeader}>Tab Three</h2>
                                    <p>
                                        This is a third example tab.
                                    </p>
                                </div>
                            </Tab>
                            <Tab label="Documents">
                                <div>
                                    <h2 style={style.tabHeader}>Tab Three</h2>
                                    <p>
                                        This is a third example tab.
                                    </p>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </Tab>
                <Tab label="Applicants" >
                    <div>
                        <h2 style={style.tabHeader}>Tab Two</h2>
                        <p>
                            This is another example tab.
                        </p>
                    </div>
                </Tab>
                <Tab
                    label="Info">
                    <div>
                        <h2 style={style.tabHeader}>Tab Three</h2>
                        <p>
                            This is a third example tab.
                        </p>
                    </div>
                </Tab>
            </Tabs>
        </div>
    }
}