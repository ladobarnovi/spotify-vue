import { onMounted, Ref, watch } from "vue";
import { useToggle } from "@/hooks/toggle";

export const useFocusOutAction = (el: Ref) => {
  const { active, setActive, toggle } = useToggle();

  const focusOutHandler = (event: MouseEvent) => {
    if (!event.composedPath().includes(el.value)) {
      setActive(false);
    }
  };

  onMounted(() => {
    if (!el) {
      alert("Need element");
      return;
    }
  });

  watch(active, (newVal: boolean) => {
    if (newVal) {
      window.addEventListener("click", focusOutHandler);
    } else {
      window.removeEventListener("click", focusOutHandler);
    }
  });

  return {
    active,
    toggle,
    setActive
  };
};
