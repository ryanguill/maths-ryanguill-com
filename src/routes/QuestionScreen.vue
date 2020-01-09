<template>
  <div>
     <ScoreKeeper/>
    <Question/>
    <SettingsButton />
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import ScoreKeeper from "../components/ScoreKeeper.vue";
import SettingsButton from "../components/SettingsButton";

export default {
  name: "QuestionScreen",
  components: {
    SettingsButton,
    Question,
    ScoreKeeper,
  }
};
</script>