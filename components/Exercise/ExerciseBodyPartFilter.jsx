import { StyleSheet, Text, View } from "react-native";
import ExerciseBodyPartList from "./ExerciseBodyPartList";
import { GlobalStyles } from "../../constants/styles";

const ExerciseBodyPartFilter = () => {
  return (
    <View style={styles.bodyPartFilterContainer}>
      <Text style={styles.bodyPartFilterHeaderText}>
        Filter by a Body Part:
      </Text>
      <ExerciseBodyPartList />
    </View>
  );
};

export default ExerciseBodyPartFilter;

const styles = StyleSheet.create({
  bodyPartFilterContainer: {
    backgroundColor: GlobalStyles.colors.secondary + "60",
    marginVertical: 5,
    paddingVertical: 5,
  },
  bodyPartFilterHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 5,
    color: GlobalStyles.colors.primary,
  },
});
