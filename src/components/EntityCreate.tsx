import * as React from "react";
import * as ReactDOM from "react-dom";
import esri = require("esri");
import Map = require("esri/map");
import Draw = require("esri/toolbars/draw")
import SnappingManager = require("esri/SnappingManager")
import Graphic = require("esri/graphic")
import Point = require("esri/geometry/Point")
import Polyline = require("esri/geometry/Polyline")
import Polygon = require("esri/geometry/Polygon")
import SimpleMarkerSymbol = require("esri/symbols/SimpleMarkerSymbol")
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol")
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol")
import Color = require("esri/Color")
import keys = require("dojo/keys");
import parser = require("dojo/parser")
import event = require("dojo/_base/event")
import {RaisedButton} from 'material-ui';

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    }
}

export interface EntityCreateViewProps {
    config: any,
    map: Map
}

export interface EntityCreateViewState {

}

export class EntityCreateView extends React.Component<EntityCreateViewProps, EntityCreateViewState> {

    toolbar: Draw

    constructor(props : EntityCreateViewProps) {
        super(props)
    }

    componentDidMount() {
        // If the map is ready, init drawing
        if (this.props.map != undefined) {
            this.createToolbar(this.props.map)
        }
    }

    componentWillReceiveProps(nextProps : EntityCreateViewProps) {
        // If the map is ready, init drawing
        if (this.props.map == undefined && nextProps.map != undefined) {
            this.createToolbar(nextProps.map)
        }
    }

    createToolbar(map : Map) {
        console.log('createToolbar')

        // Enable Snapping
        let snappingOpts: esri.SnappingManagerOptions = {
            map: map,
            alwaysSnap: true,
            tolerance: 15
        }
        map.snappingManager = new SnappingManager(snappingOpts)

        console.log(map.snappingManager)

        // // Enable drawing 
        this.toolbar = new Draw(map);
        this.toolbar.on("draw-complete", this.addToMap.bind(this));
    }
    
    activateTool(drawMode: any = Draw.POINT) {
        this.toolbar.activate(drawMode);
        this.props.map.hideZoomSlider();
    }

    addToMap(evt: any) {

        // Reset map
        this.toolbar.deactivate();
        this.props.map.showZoomSlider()

        // Add graphic to map
        var symbol: any;

        switch (evt.geometry.type) {
            case "point":
            case "multipoint":
                symbol = new SimpleMarkerSymbol();
                break;
            case "polyline":
                symbol = new SimpleLineSymbol();
                break;
            default:
                symbol = new SimpleFillSymbol();
                break;
        }

        this.props.map.graphics.add(new Graphic(evt.geometry, symbol));
    }

    render() {
        return <div style={style.container}>
            <button onClick={this.activateTool.bind(this, Draw.POINT) }>Add Route Stop</button>
            <button onClick={this.activateTool.bind(this, Draw.POLYLINE) }>Add Route Barrier</button>
            <button onClick={this.activateTool.bind(this, Draw.POLYGON) }>Move or Delete Route Stop \ Barrier</button>
            <RaisedButton label="Accept Route" primary={true} disabled={true} />
            <RaisedButton label="Restart Route" primary={true} disabled={true} />
            <RaisedButton label="Cancel" secondary={true} />
        </div>
    }
}