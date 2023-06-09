import { createContext, useState } from "react";

import { data } from "../temporary-exercise";

export const ExercisesContext = createContext({
  exercises: [],
  bodyParts: [],
  getExercise: (bodyPart = "") => {},
});

const ExercisesContextProvider = ({ children }) => {
  const [exercises, setExercise] = useState(data);
  const [bodyParts, setBodyParts] = useState([
    ...new Set(data.map((item) => item.bodyPart)),
  ]);

  function getExercisesByBodyPart(bodyPart) {
    return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
  }

  const value = {
    exercises: exercises,
    bodyParts: bodyParts,
    getExercisesByBodyPart: getExercisesByBodyPart,
  };

  return (
    <ExercisesContext.Provider value={value}>
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContextProvider;
