import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./authentication/AuthNavigator";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import WorkoutNavigation from "./navigation/WorkoutNavigation";
import CurrentWorkoutContextProvider from "./store/current-workout-context";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const navTheme = DefaultTheme;
navTheme.colors.background = "#EEEEEE";

const Navigation = () => {
  const testing = true;
  const authCtx = useContext(AuthContext);

  if (testing) {
    return (
      <NavigationContainer theme={navTheme}>
        <WorkoutNavigation />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthNavigator />}
      {authCtx.isAuthenticated && <Home />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider>
          <CurrentWorkoutContextProvider>
            <Navigation />
          </CurrentWorkoutContextProvider>
        </AuthContextProvider>
      </Provider>
    </>
  );
}
