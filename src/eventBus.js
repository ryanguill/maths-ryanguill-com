import Vue from "vue";

let state = {
  right_count: 0,
  wrong_count: 0
};

export const EventBus = new Vue({
  methods: {
    correct() {
      this.$emit("CORRECT_ANSWER");
    },
    incorrect() {
      this.$emit("INCORRECT_ANSWER");
    },
    stateChange() {
      this.$emit("STATE_CHANGE", this.getState());
    },
    getState() {
      return { ...state };
    }
  },
  created() {
    this.$on("CORRECT_ANSWER", function() {
      state.right_count += 1;
      this.stateChange();
    });
    this.$on("INCORRECT_ANSWER", function() {
      state.wrong_count += 1;
      this.stateChange();
    });
  }
});
