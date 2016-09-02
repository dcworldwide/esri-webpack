import * as React from "react";
import * as ReactDOM from "react-dom";
import esri = require("esri");
import Map = require("esri/map");
import Extent = require("esri/geometry/Extent");
import ArcGISTiledMapServiceLayer = require('esri/layers/ArcGISTiledMapServiceLayer')
import ArcGISDynamicMapServiceLayer = require('esri/layers/ArcGISDynamicMapServiceLayer')
import FeatureLayer = require('esri/layers/FeatureLayer')

let style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '#E7E7E7',
        height: '100vh'
    },
    map: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'peach',
        height: '100%'
    }
}

export interface MapProps {
    config: any,
    onMapLoaded: Function
}

export interface MapState {
    center: number[]
}

export class MapView extends React.Component<MapProps, MapState> {

    map: Map

    constructor(props: MapProps) {
        super(props)
    }

    componentDidMount() {

        let el: Element = this.refs["map"] as Element;

        this.map = new Map(ReactDOM.findDOMNode(el), {
            extent: new Extent(this.props.config.map.initialextent),
            fitExtent: true,
            logo: false,
            showAttribution: false,
            showInfoWindowOnClick: false,
            resizeDelay: 500
        })

        // Add base map layers
        this.props.config.map.basemaps.map(l => {

            let options = {
                id: l.label,
                visible: l.visible,
                opacity: l.alpha
            }

            this.map.addLayer(new ArcGISTiledMapServiceLayer(l.url, options));
        })

        // Add operational map layers
        this.props.config.map.operationallayers.map(l => {

            let options: any = {
                id: l.label,
                visible: l.visible,
                opacity: l.alpha
            }

            let layer = null

            if (l.type === "feature") {
                options.mode = l.mode
                layer = new FeatureLayer(l.url, options)
            } else {
                layer = new ArcGISDynamicMapServiceLayer(l.url, options)
            }

            this.map.addLayer(layer);
        })

        this.map.on("load", () => {
            this.props.onMapLoaded(this.map)
        })
    }

    shouldComponentUpdate(nextProps: MapProps, nextState: MapState) {
        return true 
    }

    render() {
        return <div style={style.container}>
            <div ref="map" style={style.map}></div>
        </div>
    }
}