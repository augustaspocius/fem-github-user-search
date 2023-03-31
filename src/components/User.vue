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
        
        if (response.status === 404) {
          error.value = 'No results';
          userInfo.value = null;
          return;
        }
        
        if (!response.ok) {
          error.value = 'Error fetching user information';
          userInfo.value = null;
          return;
        }
        
        error.value = null;
        userInfo.value = await response.json();
        console.log(userInfo);
      } catch (err) {
        error.value = 'Error fetching user information';
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
    <div v-if="userInfo" class="pt-8 px-6 pb-12 text-xl grid grid-cols-1 rounded-2xl border-0 bg-lm_white dark:bg-dm_darkblue shadow-xl">
      <div class="profile grid grid-cols-3 gap-5">
        <div class="w-full max-w-[117px] auto-cols-min">
          <img class="rounded-full" :src="userInfo.avatar_url" alt="profile image" />
        </div>

        <div class="info col-span-2 ">
          <div class="name text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.name || userInfo.login }}</div>
          <div class="handle text-xs pb-2 text-primary">@{{ userInfo.login }}</div>
          <div class="joined text-xs">Joined {{ new Date(userInfo.created_at).toLocaleDateString() }}</div>
          
        </div>
      </div>

      <div class="text-xs pt-6 pb-8">
        {{ userInfo.bio || 'This profile has no bio' }}
      </div>
    
      <div class="stats grid grid-cols-3 justify-evenly rounded-2xl bg-lm_whitegrey dark:bg-dm_black py-5 px-4">
        <div class="flex flex-col justify-center items-center md:items-start gap-2">
          <span class="text-xs">Repos</span>
          <span class="text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.public_repos }}</span>
        </div>
        <div class="flex flex-col justify-center items-center md:items-start gap-2">
          <span class="text-xs">Followers</span>
          <span class="text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.followers }}</span>
        </div>
        <div class="flex flex-col justify-center items-center md:items-start gap-2">
          <span class="text-xs">Following</span>
          <span class="text-base font-bold text-lm_dark dark:text-dm_white">{{ userInfo.following }}</span>
        </div>
      </div>
      
        <div class="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
          <div class="flex justify-start items-center gap-3 md:order-1">
            <img class="text-white w-5" src="/assets/icon-location.svg" alt="location icon" />
            <span v-if="userInfo.location" class="location text-xs">
              {{ userInfo.location }}
            </span>
            <span v-else class="location text-xs">
              Not Available
            </span>
          </div>
          
          <div class="flex justify-start items-center gap-3 md:order-3">
            <img class="text-white w-5" src="/assets/icon-website.svg" alt="blog icon" />
            <a v-if="userInfo.blog" :href=userInfo.blog class="blog text-xs hover:underline">
              {{ userInfo.blog }}
            </a>
            <span v-else class="blog text-xs">
              Not Available
            </span>
          </div>
          
          <div class="flex justify-start items-center gap-3 md:order-2">
            <img class="text-white w-5" src="/assets/icon-twitter.svg" alt="twitter logo" />
            <a v-if="userInfo.twitter_username" :href=userInfo.twitter_username class="twitter text-x hover:underline">
              {{ userInfo.twitter_username }}
            </a>
            <span v-else class="twitter text-xs">
              Not Available
            </span>
          </div>
          
          <div class="flex justify-start items-center gap-3 md:order-4">
            <img class="text-white w-5" src="/assets/icon-company.svg" alt="company icon" />
            <span v-if="userInfo.company" class="company text-sm">
              {{ userInfo.company }}
            </span>
            <span v-else class="company text-xs">
              Not Available
            </span>
          </div>
        </div>
      
    </div>    
    
</template>
