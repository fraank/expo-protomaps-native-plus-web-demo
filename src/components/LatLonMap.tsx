import { useRef } from "react";
import { Button } from "react-native";

import { CenteredContainer } from "./CenteredContainer";
import { FloatingContainer } from "./FloatingContainer";
import { FullWidthContainer } from "./FullWidthContainer";
import { FullWidthAndHeightContainer } from "./FullWidthAndHeightContainer";
import { NativeMapView } from "./NativeMapView";
import { MapViewRef } from "@maplibre/maplibre-react-native";

interface LatLonMapProps {
  onPress?: (latitude: number, longitude: number) => Promise<void>;
}

export const LatLonMap = (props: LatLonMapProps) => {
  const mapRef = useRef<MapViewRef>(null);

  return (
    <FullWidthAndHeightContainer>
      <NativeMapView mapRef={mapRef} />
      <FloatingContainer>
        <CenteredContainer>
          <FullWidthContainer>
            <Button
              onPress={async () => {
                if (!mapRef.current) {
                  throw new Error("Missing mapRef");
                }

                const center = await mapRef.current.getCenter();

                if (props.onPress) {
                  await props.onPress(center[1], center[0]);
                }
              }}
              title="Go"
            />
          </FullWidthContainer>
        </CenteredContainer>
      </FloatingContainer>
    </FullWidthAndHeightContainer>
  );
};
