<template>
  <div class="question-card">
    <div class="question">
      <div class="number" id="number-1">{{ firstNumber }}</div>

      <div class="operator-line">
        <span class="operator">x</span>
        <span class="number" id="number-2">{{ secondNumber }}</span>
      </div>
      <div class="answer-line">
        <input
          type="number"
          pattern="[0-9]*"
          novalidate
          value
          id="submitted_answer"
          ref="submitted_answer"
          v-model="submitted_answer"
          class="answer"
          v-on:keyup.enter="submit"
        >
      </div>
      <div class="submit-line" v-show="state !== 'CORRECT'">
        <button class="submit-button" v-on:click="submit">🤔</button>
      </div>
      <div class="messaging" v-show="state !== 'UNANSWERED'">
        <div class="message-card correct" v-show="state === 'CORRECT'">
          <div class="message">{{message}}</div>
          <span class="description">{{description}}</span>
        </div>
        <div class="message-card incorrect" v-show="state === 'INCORRECT'">
          <div class="message">{{message}}</div>
          <span class="description">{{description}}</span>
        </div>
      </div>
      <div class="next-line" v-show="state === 'CORRECT'">
        <button class="next-button" ref="next_button" v-on:click="next">next</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "../eventBus";

const correct_messages = [
  "Great Job!",
  "Excellent!",
  "Keep it up!",
  "Way to go!",
  "Great Work!",
  "🤓 Super!",
  "Wow!",
  "🤩 Amazing!",
  "😍 Nice!"
];

const incorrect_messages = [
  "Sorry, try again",
  "hmm, not quite",
  "😬 no...",
  "😖",
  "😱"
];

function random_message(messages_array) {
  const rand = _.random(0, messages_array.length - 1);
  return messages_array[rand];
}

export default {
  name: "Question",
  props: {},
  mounted() {
    this.$refs.submitted_answer.focus();
  },
  data: function() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      submitted_answer: "",
      answer: 0,
      message: "",
      description: "",
      state: "UNANSWERED"
    };
  },
  methods: {
    newQuestion() {
      this.state = "UNANSWERED";
      this.message = "";
      this.description = "";
      this.submitted_answer = "";
      this.firstNumber = _.random(0, 12);
      this.secondNumber = _.random(0, 12);
      this.answer = this.firstNumber * this.secondNumber;
    },
    submit() {
      if (this.state === "CORRECT") {
        this.next();
        return;
      }
      const parsed_submitted_answer = parseInt(this.submitted_answer, 10);

      if (this.submitted_answer.trim() === "") {
        //do nothing
        //this.state = "INCORRECT";
        //this.message = "";
        //this.description = ""
        this.$refs.submitted_answer.focus();
      } else if (parsed_submitted_answer === this.answer) {
        if (this.state === "UNANSWERED") {
          EventBus.correct();
        }
        this.state = "CORRECT";
        this.message = random_message(correct_messages);
        this.description = "";
        this.$refs.next_button.focus();
      } else {
        if (this.state === "UNANSWERED") {
          EventBus.incorrect();
        }
        this.state = "INCORRECT";
        this.message = random_message(incorrect_messages);
        this.description = "";

        if (this.firstNumber === 1 || this.secondNumber === 1) {
          this.description =
            "Remember that anything times 1 equals that number...";
        } else if (this.firstNumber === 0 || this.secondNumber === 0) {
          this.description = "Remember, anything times 0 equals 0...";
        } else if (this.firstNumber === 2 || this.secondNumber === 2) {
          this.description = "hint: anything times 2 must be an event number";
        } else if (this.firstNumber === 5 || this.secondNumber === 5) {
          this.description = "psst... anything times 5 will end in a 0 or 5";
        } else if (this.firstNumber === 10 || this.secondNumber === 10) {
          this.description =
            "remember, when you multiply by 10 you add a 0 to the right of the number";
        }
        this.$refs.submitted_answer.select();
      }
    },
    next() {
      this.newQuestion();
      this.$refs.submitted_answer.focus();
    }
  },
  computed: {},
  created: function() {
    this.newQuestion();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.question-card {
  background-color: white;
  width: 300px;
  margin: 0 auto;
  border-radius: 10px;
}

div.question {
  width: 200px;
  padding: 15px;
  margin: 0px auto;
  /* border: 1px dashed red; */
  font-weight: bold;
  font-size: 35pt;
  text-align: right;
}

.operator-line {
  border-bottom: 1px solid black;
}

.operator {
  float: left;
}

.answer {
  font-weight: bold;
  font-size: 35pt;
  width: 195px;
  text-align: right;
}
button {
  border-radius: 10px;
}

.submit-button {
  font-weight: bold;
  font-size: 35pt;
  width: 100%;
  text-align: center;
  vertical-align: middle;
}

.messaging {
  font-size: 12pt;
  text-align: center;
  font-weight: normal;
}

.message-card {
  border-radius: 10px;
  margin: 5px 0;
  padding: 10px;
}

.message-card .message {
  font-size: x-large;
  font-weight: bold;
}

.correct {
  background-color: #9bc53d;
}

.incorrect {
  background-color: #c3423f;
  color: #fff;
}

.next-button {
  font-size: xx-large;
  width: 100%;
}
</style>
