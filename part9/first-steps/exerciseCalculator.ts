interface ExerciseLog {
  target: number;
  daily_exercises: Array<number>;
}

const exerciseParser = (args: Array<string>): ExerciseLog => {
  if (args.length < 4) throw new Error("Please enter traning days ");

  const converter: number[] = [];
  const argsList = args.slice(2);
  argsList.forEach((n) => {
    if (!isNaN(Number(n))) {
      converter.push(Number(n));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  });

  return {
    target: converter[0],
    daily_exercises: converter.slice(1),
  };
};

export const calculateExercises = (exLog: ExerciseLog) => {
  const trainDays = exLog.daily_exercises.filter((d) => d > 0).length;
  const average =
    exLog.daily_exercises.reduce((p, c) => p + c) /
    exLog.daily_exercises.length;
  const success = average > exLog.target ? true : false;

  let rating = 1;
  let ratingDescription = "Next time you will get it!";
  if (average === exLog.target) {
    rating = 2;
    ratingDescription = "On Track!";
  } else if (success) {
    rating = 3;
    ratingDescription = "Awesome, keep up the good work!";
  }

  return {
    periodLength: exLog.daily_exercises.length,
    trainingDays: trainDays,
    target: exLog.target,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    average: average.toFixed(2),
  };
};

try {
  const exerciseLog = exerciseParser(process.argv);
  console.log(calculateExercises(exerciseLog));
} catch (e) {
  if (e instanceof Error)
    console.log("Error, somethign bad happend, message: ", e.message);
}
