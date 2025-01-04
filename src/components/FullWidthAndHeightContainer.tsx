import { StyleSheet, View } from "react-native";

interface FullWidthAndHeightContainerProps {
  children: React.ReactNode;
}

export const FullWidthAndHeightContainer = (
  props: FullWidthAndHeightContainerProps,
) => {
  return (
    <View style={styles.fullWidthAndHeightContainer}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  fullWidthAndHeightContainer: {
    width: "100%",
    height: "100%",
  },
});
