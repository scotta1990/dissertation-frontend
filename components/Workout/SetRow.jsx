import { StyleSheet, Text, View, TextInput } from "react-native";
import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { useDispatch } from "react-redux";
import { removeSet } from "../../store/redux/currentWorkout";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

const SetRow = ({ set, setIndex, exerciseId }) => {
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);
  const isDeletable = setIndex !== 0;
  const isAlternate = setIndex % 2 == 0;

  const content = (
    <View
      style={[
        styles.setContainer,
        isAlternate ? styles.setContainerRow : styles.setContainerRowAlternate,
      ]}
    >
      <View style={styles.setItemContainer}>
        <Text
          style={isAlternate ? styles.setNumText : styles.setNumTextAlternate}
        >
          {setIndex + 1}
        </Text>
      </View>
      <View style={styles.setItemContainer}>
        <TextInput
          style={styles.setText}
          placeholder="kg"
          value={set.measurement}
        />
      </View>
      <View style={styles.setItemContainer}>
        <TextInput style={styles.setText} placeholder="0" />
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
          onValueChange={setIsDone}
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
            dispatch(removeSet({ exerciseId: exerciseId, setId: set.id }));
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
