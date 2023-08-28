import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Card = ({ children, style }) => {
  return <View style={[styles.mainContainer, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 12,
    padding: 10,
    backgroundColor: GlobalStyles.colors.primaryWhite,
    borderRadius: 8,
    shadowColor: GlobalStyles.colors.primaryBlack,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 1.5,
  },
});
