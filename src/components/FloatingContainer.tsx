import { StyleSheet, View } from "react-native";

interface FloatingContainerProps {
  children: React.ReactNode;
}

export const FloatingContainer = (props: FloatingContainerProps) => {
  return <View style={styles.floatingContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
