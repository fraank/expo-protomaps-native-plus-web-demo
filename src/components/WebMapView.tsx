import { Ref, useEffect, useState } from "react";
import Map, { MapRef } from "react-map-gl/maplibre";
import * as Location from "expo-location";

import { CenteredContainer } from "./CenteredContainer";
import { ThemedText } from "./ThemedText";
import { MAPTILER_API_KEY } from "../core/config";
import { MAPTILER_STYLE_URL } from "../core/constants";

interface WebMapViewProps {
  mapRef?: Ref<MapRef>;
}

export const WebMapView = (props: WebMapViewProps) => {
  const [location, setLocation] = useState(null);
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);

  useEffect(() => {
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
