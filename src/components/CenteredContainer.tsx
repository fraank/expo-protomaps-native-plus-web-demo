import { StyleSheet, View } from "react-native";

interface CenteredContainerProps {
  children: React.ReactNode;
}

export const CenteredContainer = (props: CenteredContainerProps) => {
  return (
    <View style={styles.centeredContainer}>
      <View style={styles.centeredContainerInner}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
  },
  centeredContainerInner: {
    alignItems: "center",
    width: "100%",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
