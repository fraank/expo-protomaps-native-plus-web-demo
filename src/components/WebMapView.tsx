import { Ref, useEffect, useState } from "react";
import Map, { MapRef } from "react-map-gl/maplibre";
import * as Location from "expo-location";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";

import { setCurrentLocationIfAvailable } from "../core/locationUtils";
import { LoadingText } from "./LoadingText";
import { mapStyle } from "../core/map";

interface WebMapViewProps {
  mapRef?: Ref<MapRef>;
}

export const WebMapView = (props: WebMapViewProps) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);

  useEffect(() => {
    setCurrentLocationIfAvailable(setLocation, setIsLocationUnavailable);

    // Register pmtiles protocol
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  if (!location && !isLocationUnavailable) {
    return <LoadingText />;
  }

  return (
    <Map
      ref={props.mapRef}
      initialViewState={{
        latitude: location ? location.latitude : 0,
        longitude: location ? location.longitude : 0,
        zoom: location ? 12 : 2,
      }}
      style={{
        width: "100%",
        height: "100%"
      }}
      mapStyle={mapStyle}
      mapLib={maplibregl}
    />
  );
};
