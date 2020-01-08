<template>
    <div class="settings-button-card">
      <div class="settings-button-container">
        <button class="settings-button" ref="settings_button" v-on:click="openSettings">Settings</button>
      </div>
    </div>
</template>


<script>
import { EventBus } from "../eventBus";

export default {
  name: "SettingsButton",
  methods: {
    openSettings() {
      EventBus.resetState();
    }
  }
};
</script>

<style scoped>
  .settings-button-card {
    background-color: white;
    width: 300px;
    margin: 10px auto;
    border-radius: 10px;
  }

  div.settings-button-container {
    width: 200px;
    padding: 1px 0 2px 0;
    margin: 0px auto;
    /* border: 1px dashed red; */
    font-weight: bold;
    font-size: 35pt;
    text-align: right;
  }

  button {
    border-radius: 10px;
  }

  .settings-button {
    font-size: xx-large;
    width: 100%;
  }
</style>