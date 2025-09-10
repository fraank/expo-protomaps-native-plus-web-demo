import { StyleSheet } from "react-native";
import * as Location from "expo-location";

import { Camera, MapView, MapViewRef } from "@maplibre/maplibre-react-native";
import { Ref, useEffect, useState } from "react";

import { setCurrentLocationIfAvailable } from "../core/locationUtils";
import { LoadingText } from "./LoadingText";
import { mapStyle } from "../core/map";

interface NativeMapViewProps {
  mapRef?: Ref<MapViewRef>;
}

export const NativeMapView = (props: NativeMapViewProps) => {
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
    <MapView
      ref={props.mapRef}
      style={styles.map}
      mapStyle={mapStyle}
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
