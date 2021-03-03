<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {
    }
  }
})
</script>

<style>
body,html{
  height: 100%;
  padding: 0;
  margin: 0;
  -moz-user-select: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
}

.iframe{
  width: 100%;
  height: 100%;
  box-shadow: 0 0 9px #ccc;
  border: none;
  border-radius: 6px;
}
.iframeBox{
  width: auto !important;

}
</style>