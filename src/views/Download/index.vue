<template>
  <div id="download" class="page">
    <img
      src="https://open.scdn.co/cdn/images/devices/mac.80dcea83.png"
      alt="Download Spotify"
    />
    <p class="title">
      Get our free app
    </p>
    <p class="subtitle">
      Seamlessly listen to music you love. Download the Spotify app for your
      computer.
    </p>
    <a href="/" target="_blank">
      Download Desktop App
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const a = new Map();

    return {};
  }
});
</script>

<style scoped lang="scss">
#download {
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    margin: 16px 0;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 36px;
  }

  .subtitle {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: normal;
    line-height: 24px;
    margin-bottom: 16px;
  }

  a {
    display: block;
    font-weight: 700;
    background-color: #1db954;
    padding: 10px 34px;
    text-transform: uppercase;
    color: white;
    border-radius: 90000px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 1.76px;
  }
}
</style>
