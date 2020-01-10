import _ from "lodash";

export const default_state = {
  right_count: 0,
  wrong_count: 0,
  streak: 0,
  selected_problems: [
    { id: "zeros", number: 0, value: true },
    { id: "ones", number: 1, value: true },
    { id: "twos", number: 2, value: true },
    { id: "threes", number: 3, value: true },
    { id: "fours", number: 4, value: true },
    { id: "fives", number: 5, value: true },
    { id: "sixes", number: 6, value: true },
    { id: "sevens", number: 7, value: true },
    { id: "eights", number: 8, value: true },
    { id: "nines", number: 9, value: true },
    { id: "tens", number: 10, value: true },
    { id: "elevens", number: 11, value: true },
    { id: "twelves", number: 12, value: true },
    { id: "thirteens", number: 13, value: false },
    { id: "fourteens", number: 14, value: false },
    { id: "fifteens", number: 15, value: false },
    { id: "sixteens", number: 16, value: false },
    { id: "seventees", number: 17, value: false },
    { id: "eighteens", number: 18, value: false },
    { id: "nineteens", number: 19, value: false },
    { id: "twenties", number: 20, value: false }
  ],
  review: {},
  history: [],
  lastAnswer: null
};

export function serializeProblem(a, b) {
  return [a, b].sort().join(":");
}

export function deserializeProblem(problem) {
  return problem.split(":");
}

export function shouldReview({ questions_to_review = {} }) {
  if (_.random(1, 100) > 25) {
    return undefined;
  }
  const problems = Object.keys(questions_to_review).map(deserializeProblem);
  return _.sample(problems);
}

export function randomizeFactorOrder(a, b) {
  if (_.random(1, 100) > 50) {
    return [a, b];
  } else {
    return [b, a];
  }
}

export const correct_messages = [
  "Great Job!",
  "Excellent!",
  "Keep it up!",
  "Way to go!",
  "Great Work!",
  "🤓 Super!",
  "Wow!",
  "🤩 Amazing!",
  "😍 Nice!"
];

export const incorrect_messages = [
  "Sorry, try again",
  "hmm, not quite",
  "😬 no...",
  "😖",
  "😱"
];

export function random_message(messages_array) {
  const rand = _.random(0, messages_array.length - 1);
  return messages_array[rand];
}

function isProblemInHistory({ history, problem }) {
  return history.includes(problem);
}

export function nextQuestion({
  questions_to_review,
  selected_problems,
  history,
  lastAnswer
}) {
  let firstNumber = 0;
  let secondNumber = 0;
  let foundProblem = false;

  if (history.length && lastAnswer !== history[history.length - 1]) {
    [firstNumber, secondNumber] = randomizeFactorOrder(
      ...deserializeProblem(history[history.length - 1])
    );
    foundProblem = true;
  }

  if (!foundProblem) {
    // see if there are any problems we should review:
    const reviewQuestion = shouldReview({ questions_to_review });

    if (
      reviewQuestion !== undefined &&
      !isProblemInHistory({ history, problem: reviewQuestion })
    ) {
      [firstNumber, secondNumber] = randomizeFactorOrder(...reviewQuestion);
      foundProblem = true;
    }
  }

  while (!foundProblem) {
    let selected_problem_numbers = selected_problems
      .filter(p => p.value === true)
      .map(p => p.number);

    if (selected_problem_numbers.length === 0) {
      selected_problem_numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    const problem_number = _.sample(selected_problem_numbers);

    [firstNumber, secondNumber] = randomizeFactorOrder(
      problem_number,
      _.random(0, 12)
    );

    if (
      !isProblemInHistory({
        history,
        problem: serializeProblem(firstNumber, secondNumber)
      })
    ) {
      foundProblem = true;
    }
  }

  return {
    firstNumber,
    secondNumber,
    answer: firstNumber * secondNumber
  };
}
