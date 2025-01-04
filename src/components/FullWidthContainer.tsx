import { StyleSheet, View } from "react-native";

interface FullWidthContainerProps {
  children: React.ReactNode;
}

export const FullWidthContainer = (props: FullWidthContainerProps) => {
  return <View style={styles.fullWidthContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
  fullWidthContainer: {
    width: "100%",
  },
});
