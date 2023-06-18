import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./authentication/AuthNavigator";
import WorkoutNavigation from "./navigation/WorkoutNavigation";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/redux/store";

const navTheme = DefaultTheme;
navTheme.colors.background = "#EEEEEE";

const Navigation = () => {
  const testing = false;
  // const authCtx = useContext(AuthContext);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  if (testing) {
    return (
      <NavigationContainer theme={navTheme}>
        <WorkoutNavigation />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthNavigator />}
      {isAuthenticated && <WorkoutNavigation />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}
