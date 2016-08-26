import * as React from "react";
import * as ReactDOM from "react-dom";

import Map = require("esri/map");
import Draw = require("esri/toolbars/draw")
import Edit = require("esri/toolbars/edit")
import SnappingManager = require("esri/SnappingManager")
import Graphic = require("esri/graphic")
import Point = require("esri/geometry/Point")
import Polyline = require("esri/geometry/Polyline")
import Polygon = require("esri/geometry/Polygon")
import SimpleMarkerSymbol = require("esri/symbols/SimpleMarkerSymbol")
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol")
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol")
import Color = require("esri/Color")
import parser = require("dojo/parser")
import event = require("dojo/_base/event")

let style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: 'olive',
        width: '100%',
    },
    map: {
        backgroundColor: '#CCCCCC',
        display: 'flex',
        height: '100%',
    }
}

export interface MapProps {
    center: string
}

export interface MapState {
    center: number[]
}

export class MapView extends React.Component<MapProps, MapState> {

    map: Map
    toolbar: any
    editToolbar: any

    constructor(props: MapProps) {
        super(props)

        this.state = {
            center: [parseInt(props.center.split(',')[0]), parseInt(props.center.split(',')[1])]
        }
    }

    componentDidMount() {

        this.map = new Map(ReactDOM.findDOMNode(this.refs.map), {
            center: [this.state.center[0], this.state.center[1]],
            zoom: 2,
            basemap: "topo"
        });

        this.map.on("load", () => {
            console.log('map loaded')
            this.createToolbar()
        })
    }

    activateTool(drawMode: any = Draw.POINT) {
        console.log('activateTool')
        this.toolbar.activate(drawMode);
        this.map.hideZoomSlider();
    }

    createToolbar() {
        console.log('createToolbar')

        // Enable drawing 
        this.toolbar = new Draw(this.map);
        this.toolbar.on("draw-end", this.addToMap.bind(this));

        // Setup base graphics to demonstrate symbology
        this.addGraphics();

        // Enable editing 
        this.editToolbar = new Edit(this.map);
        
        // Enable Snapping
        // https://developers.arcgis.com/javascript/3/jsapi/snappingmanager-amd.html
        this.map.enableSnapping({
            alwaysSnap: true,
            tolerance: 1
        })

        //Activate the toolbar when you click on a graphic
        this.map.graphics.on("click", (e: any) => {
            event.stop(e);

            let {graphic} = e

            this.editToolbar.activate(Edit.MOVE | Edit.SCALE | Edit.ROTATE | Edit.EDIT_VERTICES, graphic);
        });

        //deactivate the toolbar when you click outside a graphic
        this.map.on("click", (evt) => {
            this.editToolbar.deactivate();
        });
    }

    addGraphics() {
        //add pre-defined geometries to map
        var polygonSymbol = new SimpleFillSymbol();
        var polylineSymbol = new SimpleLineSymbol();

        // style
        polygonSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,100,0]), 2)); 

        var polyline = new Polyline({
            "paths": [
                [
                    [-12484306, 7244028],
                    [-7318386, 10061803],
                    [-3013453, 10727111]
                ]
            ], "spatialReference": {
                "wkid": 102100
            }
        });
        var polygon = new Polygon({
            "rings": [
                [
                    [-4226661, 8496372],
                    [-3835304, 8731187],
                    [-2269873, 9005137],
                    [-1213208, 8613780],
                    [-1017529, 8065879],
                    [-1213208, 7478843],
                    [-2230738, 6891806],
                    [-2935181, 6735263],
                    [-3522218, 6891806],
                    [-3952711, 7165757],
                    [-4265797, 7283164],
                    [-4304933, 7635386],
                    [-4304933, 7674521],
                    [-4226661, 8496372]
                ]
            ],
            "spatialReference": {
                "wkid": 102100
            }
        });
        var arrow = new Polygon({
            "rings": [
                [
                    [9862211, 6617856],
                    [8922952, 5522055],
                    [8922952, 5991684],
                    [6105178, 5991684],
                    [6105178, 7087485],
                    [8922952, 7087485],
                    [8922952, 7557114],
                    [9862211, 6617856]
                ]
            ],
            "spatialReference": {
                "wkid": 102100
            }
        });
        var triangle = new Polygon({
            "rings": [
                [
                    [2426417, 8535508],
                    [4304933, 12292541],
                    [6183449, 8535508],
                    [2426417, 8535508]
                ]
            ],
            "spatialReference": {
                "wkid": 102100
            }
        });
        var point = new Point(-40, 35);

        this.map.graphics.add(new Graphic(polyline, polylineSymbol));
        this.map.graphics.add(new Graphic(polygon, polygonSymbol));
        this.map.graphics.add(new Graphic(arrow, polygonSymbol));
        this.map.graphics.add(new Graphic(triangle, polygonSymbol));
    }

    addToMap(evt: any) {
        var symbol: any;
        this.toolbar.deactivate();
        this.map.showZoomSlider()
        console.log(evt.geometry.type)
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

        var graphic = new Graphic(evt.geometry, symbol);
        this.map.graphics.add(graphic);
    }

    shouldComponentUpdate(nextProps: MapProps, nextState: any) {
        return false //nextProps.center !== this.props.center
    }

    render() {
        return <div style={style.container}>
            <div ref="map" style={style.map}></div>
            <button onClick={this.activateTool.bind(this, Draw.POINT) }>Draw Point</button>
            <button onClick={this.activateTool.bind(this, Draw.POLYLINE) }>Draw Polyline</button>
            <button onClick={this.activateTool.bind(this, Draw.POLYGON) }>Draw Polygon</button>
        </div>
    }
}