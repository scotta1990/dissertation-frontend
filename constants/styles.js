import { StyleSheet, Platform, StatusBar } from "react-native";

export const GlobalStyles = {
  colors: {
    primary: "#05668D",
    primary2: "#028090",
    secondary: "#8ECAE6",
    secondary2: "#02C39A",
    secondary3: "#71d1bc",
    primaryGoal: "#FFB703",
    accent: "#EB6100",
    successBackground: "#4BB543",
    successText: "#2EC319",
    error: "#E62A2A",
    primaryBlack: "#1e1e1e",
    primaryWhite: "#fafafa",
  },
  AndroidSafeArea: StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "#EEEEEE",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  }),
};
