interface BMIValues {
  height: number;
  weight: number;
}

const parser = (args: Array<string>): BMIValues => {
  if (args.length !== 4)
    throw new Error("Please enter height and weight in cm and kgs");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): void => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    console.log(`BMI: ${bmi.toFixed(1)} - Underweight`);
  } else if (bmi <= 24.9) {
    console.log(`BMI: ${bmi.toFixed(1)} - Normal (Healthy Weight)`);
  } else if (bmi <= 29.9) {
    console.log(`BMI: ${bmi.toFixed(1)} - Overweight`);
  } else {
    console.log(`BMI: ${bmi.toFixed(1)} - Obese`);
  }
};

try {
  const { height, weight } = parser(process.argv);
  calculateBmi(height, weight);
} catch (e) {
  console.log("Error, somethign bad happend, message: ", e.message);
}
