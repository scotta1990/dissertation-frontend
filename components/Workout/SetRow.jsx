import { StyleSheet, Text, View, TextInput } from "react-native";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { useDispatch } from "react-redux";
import { removeSet, updateSet } from "../../store/redux/currentWorkout";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";

const rightSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: GlobalStyles.colors.error,
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 0.9,
        marginVertical: 5,
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          color: GlobalStyles.colors.primaryWhite,
          paddingHorizontal: 3,
          fontWeight: "bold",
          fontSize: 16,
          paddingHorizontal: 35,
          paddingVertical: 5,
        }}
      >
        Delete
      </Text>
    </View>
  );
};

const SetRow = ({ set, setIndex, workoutItemId, exerciseMeasurement }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [measurementValue, setMeasurementValue] = useState(set.measurement);
  const [countValue, setCountValue] = useState(set.count);
  const [isDone, setIsDone] = useState(set.done);
  const isDeletable = setIndex !== 0;
  const isAlternate = setIndex % 2 == 0;

  function workoutDone(value) {
    if (countValue > 0) {
      setIsDone(value);
      dispatch(
        updateSet({
          workoutItemId: workoutItemId,
          set: {
            id: set.id,
            measurement: measurementValue,
            count: countValue,
            done: value,
          },
        })
      );
    } else {
      toast.show(
        "Your set doesn't look right, add more information to complete your set!",
        {
          type: "warning",
          placement: "top",
          duration: 4000,
          animationType: "zoom-in",
        }
      );
    }
  }

  const content = (
    <View
      style={[
        styles.setContainer,
        isDone
          ? styles.setContainerRowDone
          : isAlternate
          ? styles.setContainerRow
          : styles.setContainerRowAlternate,
      ]}
    >
      <View style={styles.setItemContainer}>
        <Text
          style={
            isAlternate || isDone
              ? styles.setNumText
              : styles.setNumTextAlternate
          }
        >
          {setIndex + 1}
        </Text>
      </View>
      <View style={styles.setItemContainer}>
        {exerciseMeasurement.measurement !== "" ? (
          <TextInput
            style={[styles.setText, isDone && { color: "white" }]}
            placeholder={exerciseMeasurement.measurement}
            keyboardType="numeric"
            value={measurementValue}
            onChangeText={setMeasurementValue}
            editable={!isDone}
          />
        ) : (
          ""
        )}
      </View>
      <View style={styles.setItemContainer}>
        <TextInput
          style={[styles.setText, isDone && { color: "white" }]}
          placeholder="0"
          keyboardType="numeric"
          value={countValue}
          onChangeText={setCountValue}
          editable={!isDone}
        />
      </View>
      <View style={styles.setItemContainer}>
        <CheckBox
          style={styles.setCheckbox}
          color={
            isDone
              ? "green"
              : isAlternate
              ? "white"
              : GlobalStyles.colors.secondary
          }
          value={isDone}
          onValueChange={workoutDone}
        />
      </View>
    </View>
  );

  if (isDeletable) {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={rightSwipeActions}
          onSwipeableRightOpen={() => {
            dispatch(
              removeSet({ workoutItemId: workoutItemId, setId: set.id })
            );
          }}
        >
          {content}
        </Swipeable>
      </GestureHandlerRootView>
    );
  }

  return content;
};

export default SetRow;

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 35,
    alignItems: "center",
  },
  setContainerRow: {
    backgroundColor: GlobalStyles.colors.secondary,
  },
  setContainerRowAlternate: {
    backgroundColor: GlobalStyles.colors.primaryWhite,
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1.5,
  },
  setContainerRowDone: {
    backgroundColor: GlobalStyles.colors.successBackground,
  },
  setItemContainer: {
    width: 50,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  setNumText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryWhite,
  },
  setNumTextAlternate: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.secondary,
  },
  setText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  setCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 25,
  },
});
