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
  <div class="flex flex-col">
    
    <Header></Header>
      
    <Search></Search>
    
    <User></User>
    
  </div>
</template>

<style>

</style>
