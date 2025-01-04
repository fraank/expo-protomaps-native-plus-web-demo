import { useRef } from "react";
import { Button } from "react-native";

import { CenteredContainer } from "./CenteredContainer";
import { FloatingContainer } from "./FloatingContainer";
import { FullWidthContainer } from "./FullWidthContainer";
import { FullWidthAndHeightContainer } from "./FullWidthAndHeightContainer";
import { WebMapView } from "./WebMapView";
import { MapRef } from "react-map-gl/maplibre";

interface LatLonMapProps {
  onPress?: (latitude: number, longitude: number) => Promise<void>;
}

export const LatLonMap = (props: LatLonMapProps) => {
  const mapRef = useRef<MapRef>(null);

  return (
    <FullWidthAndHeightContainer>
      <WebMapView mapRef={mapRef} />
      <FloatingContainer>
        <CenteredContainer>
          <FullWidthContainer>
            <Button
              onPress={async () => {
                if (!mapRef.current) {
                  throw new Error("Missing mapRef");
                }

                const center = mapRef.current.getCenter();

                if (props.onPress) {
                  await props.onPress(center.lat, center.lng);
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
