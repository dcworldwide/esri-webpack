import * as React from "react";
import * as ReactDOM from "react-dom";

import esri = require("esri");
import Map = require("esri/map");
import Legend = require("esri/dijit/Legend");
import LayerList = require("esri/dijit/LayerList");

let style = {
    container: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignContent: 'center',
        // backgroundColor: '#E7E7E7',
        // height: '100vh'
        overflow: 'scroll'
    },
    legend: {
        // display: 'flex',
        // flex: 1,
        // backgroundColor: 'peach',
        // height: '100%'
    }
}

export interface LegendProps {
    map: Map
}

export interface LegendState {

}

export class LegendView extends React.Component<LegendProps, LegendState> {

    legend: Legend
    layers: LayerList

    constructor(props: LegendProps) {
        super(props)
    }

    componentDidMount() {

        let el: Element = this.refs["legend"] as Element;

        this.legend = new Legend({
            map: this.props.map,
            respectCurrentMapScale: false,
            autoUpdate: true
        }, ReactDOM.findDOMNode(el))

        this.legend.startup();

        let layersEl: Element = this.refs["layers"] as Element;

        this.layers = new LayerList({
            map: this.props.map,
            showLegend: true,
            showSubLayers: true,
            showOpacitySlider: true,
            // layers: this.props.map.layerIds.map(layerId => {
            //     let layer = this.props.map.getLayer(layerId)
            // })
        }, ReactDOM.findDOMNode(layersEl))

        this.layers.startup();
    }

    // let x = { 
    //     "operationalLayers": [
    //         { "url": "http://servicesbeta.esri.com/arcgis/rest/services/US_Counties_Antialiasing/MapServer", "id": "US_Counties_Antialiasing_2423", "visibility": true, "opacity": 0.74, "title": "US_Counties_Antialiasing" }
    //     ], 
    //     "baseMap": { 
    //         "baseMapLayers": [
    //             { "id": "NatGeo_World_Map_9586", "opacity": 1, "visibility": true, "url": "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer" }
    //         ], 
    //         "title": "National Geographic" 
    //     }, "version": "1.6" 
    // }

shouldComponentUpdate(nextProps: LegendProps, nextState: LegendState) {
    return true
}

render() {
    return <div style={style.container}>
        <div ref="legend" style={style.legend}></div>
        <div ref="layers" style={style.legend}></div>
    </div>
}
}