<template>
  <div class="score-keeper-card">
    <div class="score-keeper">
      <div class="right score">{{ right_count }}</div>
      <div class="wrong score">{{ wrong_count }}</div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../eventBus";

export default {
  name: "ScoreKeeper",
  data: function() {
    return {
      right_count: 0,
      wrong_count: 0
    };
  },
  methods: {
    update(state) {
      this.right_count = state.right_count;
      this.wrong_count = state.wrong_count;
      console.log(state, this.right_count, this.wrong_count);
    }
  },
  created: function() {
    EventBus.$on("STATE_CHANGE", this.update);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.score-keeper-card {
  background-color: #fff;
  width: 300px;
  margin: 10px auto;
  border-radius: 25px;
}

.score {
  font-weight: bold;
  font-size: 45pt;
  text-align: center;
  width: 50%;
}

.right {
  float: left;
  background-color: #9bc53d;
}

.wrong {
  float: right;
  background-color: #c3423f;
  color: #fff;
}
</style>
