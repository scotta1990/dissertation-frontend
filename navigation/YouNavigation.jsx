import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YouSummary from "../screens/YouSummary";
import UpdateYourMeasurements from "../screens/UpdateYourMeasurements";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
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
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
