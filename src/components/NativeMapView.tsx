import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapLibreGL from "@maplibre/maplibre-react-native";
import { Camera, MapView, MapViewRef } from "@maplibre/maplibre-react-native";
import { Ref, useEffect, useState } from "react";

import { MAPTILER_API_KEY } from "../core/config";
import { MAPTILER_STYLE_URL } from "../core/constants";
import { setCurrentLocationIfAvailable } from "../core/locationUtils";
import { LoadingText } from "./LoadingText";

interface NativeMapViewProps {
  mapRef?: Ref<MapViewRef>;
}

export const NativeMapView = (props: NativeMapViewProps) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);

  useEffect(() => {
    MapLibreGL.setAccessToken(null);

    setCurrentLocationIfAvailable(setLocation, setIsLocationUnavailable);
  }, []);

  if (!location && !isLocationUnavailable) {
    return <LoadingText />;
  }

  return (
    <MapView
      ref={props.mapRef}
      style={styles.map}
      styleURL={MAPTILER_STYLE_URL.replace(
        "MAPTILER_API_KEY",
        MAPTILER_API_KEY,
      )}
    >
      <Camera
        centerCoordinate={
          location ? [location.longitude, location.latitude] : [0, 0]
        }
        zoomLevel={location ? 12 : 2}
        animationDuration={0}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
