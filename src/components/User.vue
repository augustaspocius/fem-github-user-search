<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import Search from './Search.vue';
import InfoBlock from './InfoBlock.vue';

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
    InfoBlock,
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
    
    function formatDate(dateString: string): string {
      const date = new Date(dateString);
      return `${date.getUTCDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getUTCFullYear()}`;
    }

    watchEffect(() => {
      debouncedFetchUserInfo(username.value);
    });

    return {
      username,
      userInfo,
      error,
      updateUsername,
      formatDate,
    };
  },
});
</script>

<template>
  <Search @search="updateUsername" :error="error" />
  <div v-if="userInfo"
    class="pt-8 px-6 pb-12 md:p-10 text-xl grid grid-cols-[1fr_3fr] gap-x-5 md:gap-x-10 lg:gap-x- auto-rows-auto rounded-2xl border-0 bg-lm_white dark:bg-dm_darkblue shadow-xl">
    <div class="max-w-[117px] col-start-1 col-end-2 row-start-1 row-end-2 m-auto">
      <img class="rounded-full" :src="userInfo.avatar_url" alt="profile image" />
    </div>
    <div class="profile col-start-2 col-end-3 row-start-1 row-end-2 md:gap-0">

      <div class="info lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:col-span-1">
        <div class="name text-base lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-1 md:text-2xl font-bold text-lm_dark dark:text-dm_white">{{ userInfo.name ||
          userInfo.login }}</div>
        <div class="handle text-xs lg:col-start-1 lg:col-span-1 lg:row-start-2 lg:row-span-1 md:text-sm pb-2 text-primary">@{{ userInfo.login }}</div>
        <div class="joined text-xs lg:col-start-2 lg:col-span-full lg:row-start-1 lg:row-span-1 lg:text-right lg:self-center md:text-sm">
          Joined {{ formatDate(userInfo.created_at) }}</div>
      </div>
    </div>

    <div class="col-start-1 col-span-full lg:col-start-2 row-start-2 row-end-3 text-xs md:text-sm leading-6 pt-6 pb-8 lg:mt-[-4rem]">
      {{ userInfo.bio || 'This profile has no bio.' }}
    </div>

    <div
      class="stats col-start-1 col-span-full lg:col-start-2 row-start-3 row-end-4 grid grid-cols-3 justify-evenly rounded-2xl bg-lm_whitegrey dark:bg-dm_black py-5 md:py-4 px-4 md:px-8">
      <div class="flex flex-col justify-center items-center md:items-start gap-2">
        <span class="text-xs md:text-sm">Repos</span>
        <span class="text-base md:text-xl font-bold text-lm_dark dark:text-dm_white">{{ userInfo.public_repos }}</span>
      </div>
      <div class="flex flex-col justify-center items-center md:items-start gap-2">
        <span class="text-xs md:text-sm">Followers</span>
        <span class="text-base md:text-xl font-bold text-lm_dark dark:text-dm_white">{{ userInfo.followers }}</span>
      </div>
      <div class="flex flex-col justify-center items-center md:items-start gap-2">
        <span class="text-xs md:text-sm">Following</span>
        <span class="text-base md:text-xl font-bold text-lm_dark dark:text-dm_white">{{ userInfo.following }}</span>
      </div>
    </div>

    <div class="col-start-1 col-span-full lg:col-start-2 row-start-4 row-end-5 pt-6 md:pt-7 grid grid-cols-1 md:grid-cols-2 gap-4 font-normal">
      <InfoBlock class="md:order-1" icon-src="/assets/icon-location.svg" icon-alt="location icon"
        :info-value="userInfo.location" />
      <InfoBlock class="md:order-3" icon-src="/assets/icon-website.svg" icon-alt="blog icon" :info-value="userInfo.blog"
        :is-link=true />
      <InfoBlock class="md:order-2" icon-src="/assets/icon-twitter.svg" icon-alt="twitter logo"
        :info-value="userInfo.twitter_username" />
      <InfoBlock class="md:order-4" icon-src="/assets/icon-company.svg" icon-alt="company icon"
        :info-value="userInfo.company" />
    </div>
  </div>
</template>
