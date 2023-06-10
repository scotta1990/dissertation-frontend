import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ExerciseBodyPartItem from "./ExerciseBodyPartItem";

const ExerciseBodyPartList = () => {
  const bodyParts = useSelector((store) => store.exercises.bodyParts);

  return (
    <FlatList
      data={bodyParts}
      keyExtractor={(item) => item}
      horizontal={true}
      renderItem={({ item }) => <ExerciseBodyPartItem item={item} />}
    />
  );
};

export default ExerciseBodyPartList;

const styles = StyleSheet.create({});
