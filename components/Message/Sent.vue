<template>
  <div class="message sent">
    {{ value }}
    <span class="metadata">
      <span class="time">
        {{ time }}
      </span>
      <span class="tick" :class="{ 'tick-animation': !readed }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="15"
          id="msg-dblcheck"
          x="2047"
          y="2061"
        >
          <path
            d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            fill="#92a58c"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="15"
          id="msg-dblcheck-ack"
          x="2063"
          y="2076"
        >
          <path
            d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            fill="#4fc3f7"
          />
        </svg>
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
  readed: {
    type: [Boolean],
    default: true,
  },
});
</script>