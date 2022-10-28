<template>
  <div class="message received">
    <img v-if="img" :src="img" :alt="value" style="width: 100%" />
    <span v-else>{{ value }}</span>
    <span class="metadata">
      <span class="time">
        {{ time }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  time: {
    type: [String],
  },
  value: {
    type: [String],
  },
  img: {
    type: [String],
    default: undefined,
  },
});
</script>