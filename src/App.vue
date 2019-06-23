<template>
  <div id="app">
    <ScoreKeeper/>
    <Question/>
  </div>
</template>

<script>
import Question from "./components/Question.vue";
import ScoreKeeper from "./components/ScoreKeeper.vue";

export default {
  name: "app",
  propData: {
    right_count: 0,
    wrong_count: 0
  },
  components: {
    Question,
    ScoreKeeper
  }
};
</script>

<style>
html,
body {
  background-color: #5bc0eb;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #404e4d;
}
</style>
