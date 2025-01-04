import { router } from "expo-router";

import { LatLonMap } from "../components/LatLonMap";

export default function HomeScreen() {
  return (
    <LatLonMap
      onPress={async (latitude: number, longitude: number) => {
        router.replace(`/lat-lon?lat=${latitude}&lon=${longitude}`);
      }}
    />
  );
}
