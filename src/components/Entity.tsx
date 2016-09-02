import * as React from "react";
import {Tabs, Tab, TextField, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import Map = require("esri/map");
import DataGrid = require('react-datagrid')

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        // width: '45%',
        backgroundColor: 'white'
    },
    tabHeader: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    tabBody: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '10px',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px'
    }
}

export interface EntityViewProps {
    config: any,
    map: Map,
    entity: any, // TODO generics
}

export interface EntityViewState {

}

export class EntityView extends React.Component<EntityViewProps, EntityViewState> {

    componentDidMount() {
        console.log(`Entity mounted`)
    }

    render() {

        let {entity, map} = this.props

        if (entity.isFetching) {
            return <div style={style.container}>
                Loading
                <h3>Is map ready?{map != undefined ? "true" : "false"}</h3>
            </div>
        }

        // // Table data as a list of array.
        // const rows = [
        //     ['a1', 'b1', 'c1'],
        //     ['a2', 'b2', 'c2'],
        //     ['a3', 'b3', 'c3'],
        //     // .... and more
        // ];

        //  <Table
        //                     rowHeight={50}
        //                     rowsCount={rows.length}
        //                     width={200}
        //                     height={200}
        //                     headerHeight={50}>
        //                     <Column
        //                         header={<Cell>Col 1</Cell>}
        //                         cell={<Cell>Column 1 static content</Cell>}
        //                         width={100}
        //                         />
        //                     <Column
        //                         header={<Cell>Col 2</Cell>}
        //                         cell={<Cell>Column 2 static content</Cell>}
        //                         width={100}
        //                         />
        //                 </Table>


        //

        var data = entity.data.Permit.map(p => {
            return {
                Id: p.RefId,
                StartDate: p.TravelPermit.StartDt,
                EndDate: p.TravelPermit.EndDt,
                Fee: p.FeeTotal,
                LicenseStatus: p.LicenseStatus,
                Status: p.SystemState
            }
        })

        var columns = [
            { name: 'Id' },
            { name: 'StartDate' },
            { name: 'EndDate' },
            { name: 'Fee' },
            { name: 'LicenseStatus' },
            { name: 'Status' }
        ]

        //  <DataGrid idProperty="id" dataSource={data} columns={columns} />


        // MUI table
        const permitTable = (
             <DataGrid idProperty="id" dataSource={data} columns={columns} />
            // <Table selectable={true} multiSelectable={false}>
            //     <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            //         <TableRow>
            //             {columns.map((c, idx) => {
            //                 return <TableHeaderColumn>{c.name}</TableHeaderColumn>
            //             }) }
            //         </TableRow>
            //     </TableHeader>
            //     <TableBody displayRowCheckbox={false}>
            //         {data.map((d) => {
            //             return <TableRow>
            //                 {columns.map((c, idx) => {
            //                     return <TableRowColumn>{d[c.name]}</TableRowColumn>
            //                 }) }
            //             </TableRow>
            //         }) }
            //     </TableBody>
            // </Table>
        )

        return <div style={style.container}>
            <h1>{entity.data.RefId}</h1>
            <h3>Is map ready?{map != undefined ? "true" : "false"}</h3>
            <Tabs>
                <Tab label="Permits" >
                    <div style={style.tabBody}>
                        {permitTable}
                        <Tabs>
                            <Tab label="Details" >
                                <div style={style.tabBody}>
                                    <TextField
                                        id="lga"
                                        value={entity.data.Permit[0].Lga} />
                                    <TextField
                                        id="lgaCode"
                                        value={entity.data.Permit[0].LgaCode} />
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