import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../constants/styles";

const ScreenTemplate = ({ children }) => {
  return (
    <LinearGradient
      colors={[GlobalStyles.colors.secondary2, "white"]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenTemplate;
