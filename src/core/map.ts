import { MapStyle } from "react-map-gl/maplibre";
import { layers, namedFlavor } from '@protomaps/basemaps';
import { PMTILES_URL } from "./config";

export const mapStyle: MapStyle = {
  version: 8,
  glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
  sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",  
  sources: {
    "protomaps": {
      type: "vector",
      url:`pmtiles://${PMTILES_URL}`,
      // support for https://maplibre.org/maplibre-native/android/examples/data/PMTiles/
      attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }
  },
  layers: layers("protomaps",namedFlavor("light"),{lang:"en"})
}