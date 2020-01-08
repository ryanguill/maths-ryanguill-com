<template>
  <div class="score-keeper-card">
    <div class="score-keeper">
      <div class="right">
        <div class="score">{{ right_count }}</div>

      </div>
      <div class="wrong score">{{ wrong_count }}</div>
      <div class="current-streak">{{ streak }}</div>
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
      wrong_count: 0,
      streak: 0
    };
  },
  methods: {
    update(state) {
      console.log("update", state); // eslint-disable-line
      this.right_count = state.right_count;
      this.wrong_count = state.wrong_count;
      this.streak = state.streak;
    }
  },
  created: function() {
    EventBus.$on("STATE_CHANGE", this.update);
    this.update(EventBus.getState());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.score-keeper-card {
  background-color: #fff;
  width: 300px;
  margin: 10px auto;
  border-radius: 10px;
}

.score {
  font-weight: bold;
  font-size: 35pt;
  text-align: center;

}

.score-keeper {
  position: relative;
}

.right {
  float: left;
  background-color: #9bc53d;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 50%;
  position:relative;
}

.wrong {
  float: right;
  background-color: #c3423f;
  color: #fff;
  width: 50%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.current-streak {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50px;
  font-size: 20pt;
  background-color: gold;
}

</style>
