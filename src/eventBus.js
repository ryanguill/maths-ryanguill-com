import _ from "lodash";
import Vue from "vue";
import {default_state} from "./utils";


let state = _.cloneDeep(default_state);

export const EventBus = new Vue({
  methods: {
    correct() {
      this.$emit("CORRECT_ANSWER");
    },
    incorrect() {
      this.$emit("INCORRECT_ANSWER");
    },
    setLastAnswer(problem) {
      this.$emit("SET_LAST_ANSWER", problem);
    },
    update_selected_operators(selected_operators) {
      this.$emit("UPDATE_SELECTED_OPERATORS", selected_operators);
    },
    update_selected_problems(selected_problems) {
      this.$emit("UPDATE_SELECTED_PROBLEMS", selected_problems);
    },
    setReview(problem, correct_count) {
      this.$emit("SET_REVIEW_PROBLEM", problem, correct_count);
    },
    addToHistory(problem) {
			this.$emit("ADD_TO_HISTORY", problem);
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
    this.$on("SET_LAST_ANSWER", function(problem) {
      state.lastAnswer = problem;
      this.stateChange();
    });
    this.$on("INCORRECT_ANSWER", function() {
      state.wrong_count += 1;
      state.streak = 0;
      this.stateChange();
    });
    this.$on("UPDATE_SELECTED_OPERATORS", function(selected_operators) {
      state.selected_operators = selected_operators;
      this.stateChange();
    });
    this.$on("UPDATE_SELECTED_PROBLEMS", function(selected_problems) {
      state.selected_problems = selected_problems;
      this.stateChange();
    });
    this.$on("ADD_TO_HISTORY", function(problem) {
      state.history.push(problem);
      if (state.history.length > 5) {
				state.history.shift();
      }
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
