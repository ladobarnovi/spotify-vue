<template>
  <div class="artist-actions">
    <div class="play">
      <img src="@/assets/icons/play.svg" />
    </div>
    <div class="follow-button">
      Follow
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  setup() {


    return {};
  }
})
</script>

<style scoped lang="scss">
.artist-actions {
  display: flex;
  align-items: center;
  padding: 24px 0;

  .play {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-right: 32px;
    background-color: var(--green);

    img {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
    }
  }

  .follow-button {
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    background-color: transparent;
    padding: 7px 15px;
    border: 1px solid hsla(0,0%,100%,.3);
    border-radius: 4px;
  }
}
</style>
