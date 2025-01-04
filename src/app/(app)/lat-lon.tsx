import { Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";

import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

export default function LatLonScreen() {
  const { lat, lon } = useLocalSearchParams();

  if (typeof lat !== "string") {
    throw new Error("lat is not a string");
  }
  if (typeof lon !== "string") {
    throw new Error("lon is not a string");
  }

  const latVal = parseFloat(lat);
  const lonVal = parseFloat(lon);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Latitude: {latVal}</ThemedText>
      <ThemedText>Longitude: {lonVal}</ThemedText>
      <Link href="/" asChild>
        <Button onPress={() => {}} title="Back" />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
