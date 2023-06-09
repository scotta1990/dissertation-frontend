import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Card = ({ children }) => {
  return <View style={styles.mainContainer}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primaryWhite,
    borderRadius: 8,
    shadowColor: GlobalStyles.colors.primaryBlack,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 1.5,
  },
});
