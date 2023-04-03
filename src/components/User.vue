<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import Search from './Search.vue';
import InfoBlock from './InfoBlock.vue';
import Avatar from './Avatar.vue';
import ProfileInfo from './ProfileInfo.vue';
import Bio from './Bio.vue';
import Stats from './Stats.vue';
import StatItem from './StatItem.vue';

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
    Avatar,
    ProfileInfo,
    Bio,
    Stats,
    StatItem,
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
  <div v-if="userInfo"
    class="pt-8 px-6 pb-12 md:p-10 text-xl grid grid-cols-[1fr_3fr] gap-x-5 md:gap-x-10 auto-rows-auto rounded-2xl border-0 bg-lm_white dark:bg-dm_darkblue shadow-xl">
    <Avatar :src="userInfo.avatar_url" />
    <ProfileInfo :name="userInfo.name" :login="userInfo.login" :joinedDate="userInfo.created_at" />
    <Bio :bio="userInfo.bio || 'This profile has no bio.'" />

    <Stats>
      <StatItem label="Repos" :value="userInfo.public_repos" />
      <StatItem label="Followers" :value="userInfo.followers" />
      <StatItem label="Following" :value="userInfo.following" />
    </Stats>

    <div class="col-span-full lg:col-start-2 row-start-4 row-end-5 pt-6 md:pt-7 grid grid-cols-1 md:grid-cols-2 gap-4 font-normal">
      <InfoBlock class="md:order-1" icon-src="/assets/icon-location.svg" icon-alt="location icon"
        :info-value="userInfo.location" />
      <InfoBlock class="md:order-3" icon-src="/assets/icon-website.svg" icon-alt="blog icon" 
        :info-value="userInfo.blog"
        :is-link=true />
      <InfoBlock class="md:order-2" icon-src="/assets/icon-twitter.svg" icon-alt="twitter logo"
        :info-value="userInfo.twitter_username" />
      <InfoBlock class="md:order-4" icon-src="/assets/icon-company.svg" icon-alt="company icon"
        :info-value="userInfo.company" />
    </div>
  </div>
</template>
