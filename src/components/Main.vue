<script setup lang="ts">
  import { createApp } from 'vue';
  import Header from './Header.vue';
  import Search from './Search.vue';
  import User from './User.vue';


  const main = createApp({
    data() {
      return {
        msg: 'Main Component'
      }
    }
  })
</script>

<template>
  <main class="container main flex flex-col justify-center font-spacemono gap-4">
      <Header></Header>      
      <User></User>
  </main>
</template>

<style>

.main {
  min-width: 20.4375rem;
  max-width: 45.625rem;
}

</style>
