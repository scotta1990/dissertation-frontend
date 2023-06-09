import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increaseWorkoutDuration } from "../../store/redux/currentWorkout";

const WorkoutTimer = ({ containerStyle, textStyle }) => {
  const workoutDuration = useSelector(
    (state) => state.currentWorkout.workoutDuration
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(increaseWorkoutDuration());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  var hours = Math.floor(workoutDuration / 3600);
  var minutes = Math.floor((workoutDuration % 3600) / 60);
  var seconds = Math.floor(workoutDuration % 60);

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {hours > 0 ? hours + "h " : ""}
        {minutes > 0 ? minutes + "m " : ""}
        {seconds + "s"}
      </Text>
    </View>
  );
};

export default WorkoutTimer;
