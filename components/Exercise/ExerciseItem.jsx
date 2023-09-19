import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Card from "../UI/Card";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

const ExerciseItem = ({ exercise, onPress }) => {
  const navigation = useNavigation();

  function onPressHandler() {
    onPress(exercise);
  }

  return (
    <Card>
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={exercise.gifUrl} />
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseNameText}>{exercise.name}</Text>
          <Text style={styles.exerciseDescriptionText}>
            Body Part: {exercise.bodyPart}
          </Text>
          <Text style={styles.exerciseDescriptionText}>
            Muscle Group Target: {exercise.target}
          </Text>
          <Text style={styles.exerciseDescriptionText}>
            Equipment: {exercise.equipment}
          </Text>
        </View>
        <Button
          style={styles.button}
          backgroundColor={GlobalStyles.colors.accent}
          textStyle={styles.buttonText}
          onPress={onPressHandler}
        >
          Add
        </Button>
      </View>
    </Card>
  );
};

export default ExerciseItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    flex: 1,
  },
  exerciseContainer: {
    flex: 3,
    marginHorizontal: 18,
  },
  exerciseNameText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
    flexWrap: "wrap",
  },
  exerciseDescriptionText: {
    textTransform: "capitalize",
    fontSize: 9,
    marginVertical: 1,
    paddingVertical: 1,
  },
  image: {
    width: 70,
    height: 70,
  },
  button: {
    justifyContent: "flex-end",
    flex: 1,
  },
  buttonText: {
    fontSize: 12,
  },
});
