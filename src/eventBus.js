import Vue from "vue";

let state = {
  right_count: 0,
  wrong_count: 0,
	streak: 0,
};

export const EventBus = new Vue({
  methods: {
    correct() {
      this.$emit("CORRECT_ANSWER");
    },
    incorrect() {
      this.$emit("INCORRECT_ANSWER");
    },
    loadState(newState) {
      console.log("loadstate", newState); // eslint-disable-line
      state = newState;
      this.stateChange({ persistToLocalStorage: false });
    },
    stateChange({ persistToLocalStorage = true } = {}) {
      console.log("stateChange", persistToLocalStorage); // eslint-disable-line
      this.$emit("STATE_CHANGE", this.getState());
      if (persistToLocalStorage) {
        console.log("persisting to local storage", this.getState()); // eslint-disable-line
        localStorage.state = JSON.stringify(this.getState());
      }
    },
    getState() {
      return { ...state };
    }
  },
  created() {
    if (localStorage.state) {
      this.loadState(JSON.parse(localStorage.state));
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
  }
});
