<template>
  <transition name="modal-transition" appear mode="out-in">
    <div class="modal">
      <div class="modal-body" ref="scrollContainer">
        <slot />

        <div class="modal-close" @click="$emit('close')">
          <img src="@/assets/icons/close.svg" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import OverlayScrollbars from "overlayscrollbars";

export default defineComponent({
  setup() {
    const scrollContainer = ref();

    onMounted(() => {
      OverlayScrollbars(scrollContainer.value as HTMLElement, {
        resize: "both"
      });
    });

    return {
      scrollContainer
    };
  }
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-body {
    width: 768px;
    min-width: 500px;
    max-height: 70vh;
    height: 100%;
    background-color: #121212;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;

    img {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.7;
    }

    &:hover {
      background-color: #121212;

      img {
        opacity: 1;
      }
    }
  }
}

.modal-transition-enter-from,
.modal-transition-leave-to {
  opacity: 0;

  .modal-body {
    transform: translateY(-45%) translateX(-50%);
  }
}

.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: opacity 0.3s ease;

  .modal-body {
    transition: transform 0.3s ease;
  }
}
</style>
