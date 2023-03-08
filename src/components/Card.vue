<script setup lang="ts">
  import { createApp } from 'vue';


  const card = createApp({
    data() {
      return {
        msg: 'Welcome to Your Vue.js + TypeScript App'
      }
    }
  })
</script>

<template>
  <div class="text-3xl">
    <span class="font-bold underline">
        Hello world!
    </span>
    <span class="font-bold underline">
        devfinder
    </span>
    <span class="font-bold underline">
        {{ card.msg }}
    </span>
    <span class="text-primary">
        Light
        Dark

        Search GitHub username...
        Search

        Joined

        Repos
        Followers
        Following
    </span>
  </div>
</template>


<style>
.card{
    
}
</style>
