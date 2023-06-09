import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Measurements from "../screens/Measurements";
import ProfileMenu from "../screens/ProfileMenu";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
      <Stack.Screen
        name="Measurements"
        component={Measurements}
        options={{ title: "Your Measurements" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
