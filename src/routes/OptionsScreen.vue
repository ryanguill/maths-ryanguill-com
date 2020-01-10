<template>
  <div>
    <div class="card">
      <h2>Options</h2>

      <router-link to="/q"
        ><button class="button">back to work!</button></router-link
      >
      <button class="button reset-button" v-on:click="reset_progress">
        Reset Progress
      </button>
    </div>
    <div class="card">
      <h3>Choose which problems you want to work on:</h3>
      <div v-for="problem in selected_problems" v-bind:key="problem.id">
        <div class="problem-option">
          <label>
            <input
              type="checkbox"
              v-on:change="change"
              v-model="problem.value"
            />
            {{ problem.number }}'s
          </label>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Review Problems:</h3>
      <div v-for="(reviewProblem, index) in review" :key="index">
        <div class="review-problem">{{ reviewProblem }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "../eventBus";
import { default_state, deserializeProblem } from "../utils";

export default {
  name: "OptionsScreen",
  data: function() {
    return {
      selected_problems: _.cloneDeep(default_state.selected_problems),
      review: []
    };
  },
  methods: {
    change: function() {
      EventBus.update_selected_problems(this.selected_problems);
    },
    on_state_change: function(state) {
      this.selected_problems = state.selected_problems;
      this.review = Object.keys(state.review).map(p => {
        const [a, b] = deserializeProblem(p);
        return `${a} x ${b}`;
      });
    },
    reset_progress: function() {
      if (confirm("Are you sure? You will lose all of your progress!")) {
        EventBus.resetState();
      }
    }
  },
  created: function() {
    EventBus.$on("STATE_CHANGE", this.on_state_change);
    this.on_state_change(EventBus.getState());
  }
};
</script>

<style scoped>
.card {
  background-color: white;
  width: 300px;
  margin: 10px auto;
  border-radius: 10px;
  padding-top: 15px;
  padding-bottom: 25px;
}

.button {
  border-radius: 10px;
  font-size: xx-large;
  width: 98%;
  padding: 3px 5px;
  margin: 3px auto;
}

.reset-button {
  color: white;
  background-color: red;
}

.problem-option {
  width: 100%;
  font-size: x-large;
  vertical-align: center;
  margin: 3px 0;
}

.problem-option label {
}

.problem-option input[type="checkbox"] {
  transform: scale(2, 2);
}

.review-problem {
  font-size: x-large;
}
</style>
