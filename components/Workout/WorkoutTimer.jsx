import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CurrentWorkoutContext } from "../../store/current-workout-context";

const WorkoutTimer = ({ containerStyle, textStyle }) => {
  const currentWorkoutCtx = useContext(CurrentWorkoutContext);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTotalSeconds(currentWorkoutCtx.getDuration());
      currentWorkoutCtx.increaseDuration();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = Math.floor(totalSeconds % 60);

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
