<template>
  <div id="app">
    <ScoreKeeper/>
    <Question/>
    <SettingsButton />
  </div>
</template>

<script>
import Question from "./components/Question.vue";
import ScoreKeeper from "./components/ScoreKeeper.vue";
import SettingsButton from "./components/SettingsButton";

export default {
  name: "app",
  components: {
    SettingsButton,
    Question,
    ScoreKeeper,
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
