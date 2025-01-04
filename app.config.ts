import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Expo MapLibre native + web demo",
  slug: "expo-maplibre-native-plus-web-demo",
  plugins: [...config.plugins, ["@maplibre/maplibre-react-native"]],
});
