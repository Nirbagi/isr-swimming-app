const exercisesQueries = require("../db/queries/exercises");

async function expandExercises(exercises) {
  expanded_exercises = {};
  for (let ex in exercises) {
    let expanded_ex = await exercisesQueries.getExerciseByID({
      exercise_id: parseInt(exercises[ex]),
    });
    expanded_exercises[ex] = expanded_ex;
  }
  return expanded_exercises;
}

async function expandMultipleTrainingsExercises(trainings) {
  for (let tr in trainings) {
    let expanded_exercises = {};
    expanded_exercises = await expandExercises(trainings[tr].exercises);
    trainings[tr].exercises = expanded_exercises;
  }
  return trainings;
}

module.exports = {
  expandExercises,
  expandMultipleTrainingsExercises,
};
