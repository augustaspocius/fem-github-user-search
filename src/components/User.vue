<script setup lang="ts">
  import { createApp } from 'vue';

</script>

<template>

    <div class="container card text-xl flex flex-col 
            rounded-2xl border-0 bg-dm_darkblue">
        
            <div class="profile flex flex-row">
                <div class="image">
                    <img src="" alt="profile image"/>
                </div>
                
                <div class="info flex-col">
                    <div class="name">Name</div>
                    <div class="handle">@Handle</div>
                    <div class="joined">Joined</div>
                </div>
            </div>
            
            <div class="description">
                Bio
            </div>
            
            <div class="stats flex flex-row">
                Repos
                Followers
                Following
            </div>
    </div>

</template>

<style>

</style>
