<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
})
</script>

<style scoped lang="scss">
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: 0 6px;
    animation: loader 1s infinite ease;
    display: inline-block;
    background-color: #b3b3b3;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.3}s;
      }
    }
  }
}

@keyframes loader {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
