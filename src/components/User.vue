<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
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
  setup() {
    const username = ref('octocat');
    const userInfo = ref<UserInfo | null>(null);
    const error = ref<any>(null);

    async function fetchUserInfo(username: string) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          error.value = `Error fetching user information: ${response.status} - ${errorData.message}`;
          userInfo.value = null;
          return;
        }
        error.value = null;
        userInfo.value = await response.json();
      } catch (err: any) {
        error.value = `Error fetching user information: ${err.message}`;
        userInfo.value = null;
      }
    }
    
    function debounce(fn: (username: string) => Promise<void>, delay: number) {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      return function (username: string) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => fn(username), delay);
      };
    }
    
    const debouncedFetchUserInfo = debounce(fetchUserInfo, 300);

    
    function updateUsername(newUsername: string) {
      username.value = newUsername;
    }

    watchEffect(() => {
      debouncedFetchUserInfo(username.value);
    });

    return {
      username,
      userInfo,
      error,
      updateUsername,
    };
  },
});
</script>

<template>
    <Search @search="updateUsername" :error="error" />
    <div v-if="userInfo" class="pt-8 px-6 pb-12 text-xl flex flex-col rounded-2xl border-0 bg-lm_white dark:bg-dm_darkblue shadow-xl">
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
            <img class="text-white w-5" src="/assets/icon-location.svg" alt="location icon" />
            <span v-if="userInfo.location" class="location text-xs">
              {{ userInfo.location}}
            </span>
          </div>
          
          <div class="flex justify-start items-center gap-3">
            <img class="text-white w-5" src="/assets/icon-website.svg" alt="blog icon" />
            <a v-if="userInfo.blog" :href=userInfo.blog class="blog text-xs hover:underline">
              {{ userInfo.blog }}
            </a>
          </div>
          
          <div class="flex justify-start items-center gap-3">
            <img class="text-white w-5" src="/assets/icon-twitter.svg" alt="twitter logo" />
            <a v-if="userInfo.twitter_username" :href=userInfo.twitter_username class="twitter text-x hover:underline">
              {{ userInfo.twitter_username }}
            </a>
          </div>
          
          <div class="flex justify-start items-center gap-3">
            <img class="text-white w-5" src="/assets/icon-company.svg" alt="company icon" />
            <span class="company text-sm">
              {{ userInfo.company }}
            </span>
          </div>
        </div>
      
    </div>    
    
</template>
