import { StyleSheet } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import { Camera, MapView, MapViewRef } from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";
import { Ref, useEffect, useState } from "react";

import { CenteredContainer } from "./CenteredContainer";
import { ThemedText } from "../components/ThemedText";
import { MAPTILER_API_KEY } from "../core/config";
import { MAPTILER_STYLE_URL } from "../core/constants";

interface NativeMapViewProps {
  mapRef?: Ref<MapViewRef>;
}

export const NativeMapView = (props: NativeMapViewProps) => {
  const [location, setLocation] = useState(null);
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);

  useEffect(() => {
    MapLibreGL.setAccessToken(null);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsLocationUnavailable(true);
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      } catch (_e) {
        setIsLocationUnavailable(true);
      }
    })();
  }, []);

  if (!location && !isLocationUnavailable) {
    return (
      <CenteredContainer>
        <ThemedText>Loading...</ThemedText>
      </CenteredContainer>
    );
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
