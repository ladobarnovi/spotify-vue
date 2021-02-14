import { ref } from "vue";

export const useToggle = (initialState = false) => {
  const active = ref(initialState);

  const toggle = () => {
    active.value = !active.value;
  };

  const setActive = (a: boolean) => {
    active.value = a;
  };

  return {
    active,
    toggle,
    setActive
  };
};
