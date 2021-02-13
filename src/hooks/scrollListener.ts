import { onMounted, onBeforeUnmount, ref, watch } from "vue";
export const mainScroll = ref<any>(null);

export function useMainScroll(handler: () => void) {
  function addListener(): void {
    if (mainScroll.value) {
      mainScroll.value.getElements().viewport.addEventListener("scroll", handler);
    }
  }

  function removeListener(): void {
    if (mainScroll.value) {
      mainScroll.value.getElements().viewport.removeEventListener("scroll", handler);
    }
  }

  onMounted(() => addListener());
  onBeforeUnmount(() => removeListener());

  watch(mainScroll, () => addListener())
}
