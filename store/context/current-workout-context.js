import { createContext, useState } from "react";

export const CurrentWorkoutContext = createContext({
  currentWorkout: {},
  workoutInProgress: false,
  workoutDuration: {},
  startWorkout: (workout) => {},
  endWorkout: () => {},
  getDuration: () => {},
  increaseDuration: () => {},
  addExercise: (exercise) => {},
  removeExercise: (exerciseIndex) => {},
  addSet: (exerciseIndex, set) => {},
  removeSet: (exerciseIndex, setIndex) => {},
  setDuration: (duration) => {},
});

const CurrentWorkoutContextProvider = ({ children }) => {
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [exercisesSets, setExercisesSet] = useState([]);
  const [workoutDuration, setWorkoutDuration] = useState({ duration: 0 });
  const [workoutInProgress, setWorkoutInProgress] = useState(false);

  function startWorkout() {
    setWorkoutInProgress(true);
  }

  function endWorkout() {
    setWorkoutInProgress(false);
  }

  function addExercise(exercise) {
    setCurrentWorkout((workout) => {
      exercise.sets = [{ id: 1, measurement: "", count: "", done: false }];
      return [...workout, exercise];
    });
  }

  function removeExercise(exerciseIndex) {
    setCurrentWorkout((workout) => {
      return workout.filter((item, index) => index != exerciseIndex);
    });
  }

  function addSet(exerciseIndex) {}

  function removeSet(exerciseIndex, setIndex) {}

  function getDuration() {
    return workoutDuration.duration;
  }

  function increaseDuration() {
    setWorkoutDuration((current) => {
      current.duration = current.duration + 1;
      return current;
    });
  }

  const value = {
    currentWorkout: currentWorkout,
    workoutDuration: workoutDuration,
    workoutInProgress: workoutInProgress,
    startWorkout: startWorkout,
    endWorkout: endWorkout,
    addExercise: addExercise,
    removeExercise: removeExercise,
    addSet: addSet,
    removeSet: removeSet,
    getDuration: getDuration,
    increaseDuration: increaseDuration,
  };

  return (
    <CurrentWorkoutContext.Provider value={value}>
      {children}
    </CurrentWorkoutContext.Provider>
  );
};

export default CurrentWorkoutContextProvider;
