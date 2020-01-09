import _ from "lodash";
import Vue from "vue";

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
    { id: "twenties", number: 20, value: false },
  ],
  review: {}
};

let state = _.cloneDeep(default_state);

export function serializeProblem (a, b) {
  return [a, b].sort().join(':');
}

export function deserializeProblem (problem) {
  return problem.split(':');
}

export const EventBus = new Vue({
  methods: {
    correct() {
      this.$emit("CORRECT_ANSWER");
    },
    incorrect() {
      this.$emit("INCORRECT_ANSWER");
    },
    update_selected_problems(selected_problems) {
      this.$emit("UPDATE_SELECTED_PROBLEMS", selected_problems);
    },
    setReview(problem, correct_count) {
      this.$emit("SET_REVIEW_PROBLEM", problem, correct_count);
    },
    loadState(newState) {
      state = newState;
      this.stateChange({ persistToLocalStorage: false });
    },
    resetState() {
      state = _.cloneDeep(default_state);
      this.stateChange({ persistToLocalStorage: true });
    },
    stateChange({ persistToLocalStorage = true } = {}) {
      this.$emit("STATE_CHANGE", this.getState());
      if (persistToLocalStorage) {
        localStorage.state = JSON.stringify(this.getState());
      }
    },
    getState() {
      return { ...state };
    }
  },
  created() {
    if (localStorage.state) {
      const newState = JSON.parse(localStorage.state);
      this.loadState({ ...default_state, ...newState });
    }
    this.$on("CORRECT_ANSWER", function() {
      state.right_count += 1;
      state.streak += 1;
      this.stateChange();
    });
    this.$on("INCORRECT_ANSWER", function() {
      state.wrong_count += 1;
      state.streak = 0;
      this.stateChange();
    });
    this.$on("UPDATE_SELECTED_PROBLEMS", function(selected_problems) {
      state.selected_problems = selected_problems;
      this.stateChange();
    });
    this.$on("SET_REVIEW_PROBLEM", function(problem, correct_count) {
      // if theyve gotten it right 5 times now, remove it from review
      if (correct_count >= 5) {
        delete state.review[problem];
      } else {
        state.review[problem] = correct_count;
      }
      this.stateChange();
    });
  }
});
