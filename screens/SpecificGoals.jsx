import { StyleSheet, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getGoalsByType } from "../store/redux/yourGoals";
import { useEffect } from "react";
import { FlatList } from "react-native";
import SpecificGoalItem from "../components/Goals/SpecificGoalItem";

const renderGoalItem = (item, type, token) => {
  return <SpecificGoalItem item={item} type={type} token={token} />;
};

const SpecificGoals = ({ route, navigation }) => {
  const { type } = route?.params;
  const token = useSelector((store) => store.auth.token);

  const state = useSelector((state) => state);

  const [goals, setGoals] = useState();

  useEffect(() => {
    const goalsList = getGoalsByType(state, type);
    setGoals(goalsList);
  }, [type, state]);

  const onPressHandler = () => {
    navigation.navigate("SpecificGoalManagement", { type: type });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={goals}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return renderGoalItem(item, type, token);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          backgroundColor={GlobalStyles.colors.accent}
          onPress={onPressHandler}
        >
          Add {type} Goal
        </Button>
      </View>
    </View>
  );
};

export default SpecificGoals;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
    justifyContent: "flex-end",
    flex: 0.08,
  },
  button: {
    margin: 10,
    marginTop: 0,
  },
});
