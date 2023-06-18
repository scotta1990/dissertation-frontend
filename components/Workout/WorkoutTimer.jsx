import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increaseDuration } from "../../store/redux/currentWorkout";

const WorkoutTimer = ({ containerStyle, textStyle }) => {
  const duration = useSelector((state) => state.currentWorkout.duration);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(increaseDuration());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  var hours = Math.floor(duration / 3600);
  var minutes = Math.floor((duration % 3600) / 60);
  var seconds = Math.floor(duration % 60);

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
