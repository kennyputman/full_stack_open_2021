interface ExerciseLog {
  target: number;
  log: Array<number>;
}

const exerciseParser = (args: Array<string>): ExerciseLog => {
  if (args.length < 4) throw new Error("Please enter traning days ");

  let converter: number[] = [];
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
    log: converter.slice(1),
  };
};

const calculateExercises = (exLog: ExerciseLog) => {
  const trainDays = exLog.log.filter((d) => d > 0).length;
  const success = trainDays > exLog.target ? true : false;

  let rating: number = 1;
  let ratingDescription = "Next time you will get it!";
  if (trainDays === exLog.target) {
    rating = 2;
    ratingDescription = "On Track!";
  } else if (success) {
    rating = 3;
    ratingDescription = "Awesome, keep up the good work!";
  }

  return {
    periodLength: exLog.log.length,
    trainingDays: trainDays,
    target: exLog.target,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    average: exLog.log.reduce((p, c) => p + c) / exLog.log.length,
  };
};

try {
  let exerciseLog = exerciseParser(process.argv);
  console.log(calculateExercises(exerciseLog));
} catch (e) {
  console.log("Error, somethign bad happend, message: ", e.message);
}
