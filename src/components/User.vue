<script lang="ts">
import { defineComponent } from 'vue';
import Search from './Search.vue';

interface UserInfo {
  avatar_url: string;
  name: string | null;
  login: string;
  created_at: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
}

export default defineComponent({
  components: {
    Search,
  },
  data() {
    return {
      username: 'octocat',
      userInfo: null as UserInfo | null,
      error: null as string | null,
    };
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        if (!response.ok) {
          this.error = 'User not found';
          this.userInfo = null;
          return;
        }
        this.error = null;
        this.userInfo = await response.json();
        console.log(this.userInfo);
      } catch (err) {
        this.error = 'Error fetching user information';
        this.userInfo = null;
      }
    },
    updateUsername(newUsername: string) {
      this.username = newUsername;
      this.fetchUserInfo();
    },
  },
  mounted() {
    this.fetchUserInfo();
  },
});
</script>

<template>
    <Search @search="updateUsername" />
    <div v-if="userInfo" class="card text-xl flex flex-col rounded-2xl border-0 bg-lm_white dark:bg-dm_darkblue shadow-xl">
      <div class="profile flex flex-row gap-5">
        <div class="w-16 md:w-28">
          <img class="rounded-full" :src="userInfo.avatar_url" alt="profile image" />
        </div>

        <div class="info flex-col">
          <div class="name text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.name || userInfo.login }}</div>
          <div class="handle text-xs pb-2 text-primary">@{{ userInfo.login }}</div>
          <div class="joined text-xs">Joined {{ new Date(userInfo.created_at).toLocaleDateString() }}</div>
          
        </div>
      </div>

      <div class="text-xs pt-6 pb-8">
        {{ userInfo.bio || 'This profile has no bio' }}
      </div>
    
      <div class="stats flex flex-row justify-evenly rounded-2xl bg-lm_whitegrey dark:bg-dm_black py-5 px-4">
        <div class="flex flex-col justify-center items-center gap-2">
          <span class="text-xs">Repos</span>
          <span class="text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.public_repos }}</span>
        </div>
        <div class="flex flex-col justify-center items-center gap-2">
          <span class="text-xs">Followers</span>
          <span class="text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.followers }}</span>
        </div>
        <div class="flex flex-col justify-center items-center gap-2">
          <span class="text-xs">Following</span>
          <span class="text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.following }}</span>
        </div>
      </div>
      
        <div class="pt-6 flex flex-col gap-4 font-bold">
          <div class="flex justify-start items-center gap-3">
            <img class="bottom-icons" src="/assets/icon-location.svg" alt="location" />
            <span v-if="userInfo.location" class="location text-xs">
              {{ userInfo.location}}
            </span>
          </div>
          
          <div class="flex justify-start items-center gap-3">
            <img class="bottom-icons" src="/assets/icon-website.svg" alt="location" />
            <a v-if="userInfo.blog" :href=userInfo.blog class="blog text-xs hover:underline">
              {{ userInfo.blog }}
            </a>
          </div>
          
          <div class="flex justify-start items-center gap-3">
            <img class="bottom-icons" src="/assets/icon-twitter.svg" alt="location" />
            <a v-if="userInfo.twitter_username" :href=userInfo.twitter_username class="twitter text-x hover:underline">
              {{ userInfo.twitter_username }}
            </a>
          </div>
          
          <div class="flex justify-start items-center gap-3">
            <img class="bottom-icons" src="/assets/icon-company.svg" alt="location" />
            <span class="company text-sm">
              {{ userInfo.company }}
            </span>
          </div>
        </div>
      
    </div>
    <div v-else class="error">{{ error }}</div>
    
    
</template>

<style>

.bottom-icons{
  color: white;
  width:20px;
}

.card {
  padding: 32px 24px 48px 24px;
}

</style>
