  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        iconSrc: {
            type: String,
            required: true,
        },
        iconAlt: {
            type: String,
            required: true,
        },
        infoValue: {
            type: String || null,
            default: null,
        }
    },
});
</script>
<template>
    <div class="flex justify-start items-center gap-3 text-xs md:text-sm" :class="{ 'opacity-50': !infoValue, ...$attrs.class }">
        <img class="text-white w-5 filter-none dark:filter saturate-200 brightness-0 invert" :src="iconSrc"
            :alt="iconAlt" />
        <template v-if="$attrs['is-link']">
            <a v-if="infoValue" :href="infoValue" class="hover:underline">
                {{ infoValue }}
            </a>
            <span v-else>
                Not Available
            </span>
        </template>
        <template v-else>
            <span v-if="infoValue">
                {{ infoValue }}
            </span>
            <span v-else>
                Not Available
            </span>
        </template>
    </div>
</template>
