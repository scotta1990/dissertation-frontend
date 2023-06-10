import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { setBodyPartFilter } from "../../store/redux/exercises";

const ExerciseBodyPartItem = ({ item }) => {
  const selectedItem = useSelector((store) => store.exercises.bodyPartsFilter);
  const dispatch = useDispatch();
  return (
    <Button
      backgroundColor={
        item === selectedItem
          ? GlobalStyles.colors.accent
          : GlobalStyles.colors.primary
      }
      style={styles.button}
      textStyle={styles.buttonText}
      onPress={() => dispatch(setBodyPartFilter({ bodyPart: item }))}
    >
      {item}
    </Button>
  );
};

export default ExerciseBodyPartItem;

const styles = StyleSheet.create({
  button: {
    margin: 3,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 11,
    fontWeight: "normal",
    textAlign: "center",
  },
});
