import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YouSummary from "../screens/YouSummary";
import UpdateYourMeasurements from "../screens/UpdateYourMeasurements";
import { GlobalStyles } from "../constants/styles";
import Account from "../screens/Account";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary },
        headerTintColor: GlobalStyles.colors.primaryWhite,
      }}
    >
      <Stack.Screen
        name="YouSummary"
        component={YouSummary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateYourMeasurements"
        component={UpdateYourMeasurements}
        initialParams={{ historical: false }}
        options={{
          title: "Update Your Measurements",
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          title: "Your Account",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
