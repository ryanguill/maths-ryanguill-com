<template>
  <router-link to="/options"><div class="settings-link">⚙️</div></router-link>
</template>

<script>
export default {
  name: "SettingsButton"
};
</script>

<style scoped>
.settings-link {
  position: absolute;
  font-size: 35pt;
  text-decoration: none;
  bottom: 5px;
}
</style>
