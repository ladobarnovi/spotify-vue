<template>
  <div class="more-less-text">
    <span>{{ visibleText }}</span>
    <button @click="toggle">
      <span v-if="active">show less</span>
      <span v-else>... see more</span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useToggle } from "@/hooks/toggle";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { active, toggle } = useToggle();

    const visibleText = computed(() => {
      if (active.value) {
        return props.text;
      } else {
        return props.text.substr(0, 150);
      }
    });

    return {
      visibleText,
      active,
      toggle
    };
  }
});
</script>

<style scoped lang="scss">
.more-less-text {
  color: #b3b3b3;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  button {
    background: none;
    color: white;
    border: none;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    font-weight: 700;
  }
}
</style>
