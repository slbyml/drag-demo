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
</style>