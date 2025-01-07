import { Ref, useEffect, useState } from "react";
import Map, { MapRef } from "react-map-gl/maplibre";
import * as Location from "expo-location";

import { MAPTILER_API_KEY } from "../core/config";
import { MAPTILER_STYLE_URL } from "../core/constants";
import { setCurrentLocationIfAvailable } from "../core/locationUtils";
import { LoadingText } from "./LoadingText";

interface WebMapViewProps {
  mapRef?: Ref<MapRef>;
}

export const WebMapView = (props: WebMapViewProps) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);

  useEffect(() => {
    setCurrentLocationIfAvailable(setLocation, setIsLocationUnavailable);
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
      style={{ width: "100%", height: "100%" }}
      mapStyle={MAPTILER_STYLE_URL.replace(
        "MAPTILER_API_KEY",
        MAPTILER_API_KEY,
      )}
    />
  );
};
