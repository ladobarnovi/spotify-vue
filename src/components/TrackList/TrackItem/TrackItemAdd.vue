<template>
  <div class="track-add">
    <div>
      ADD
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup() {
    return {};
  }
})
</script>

<style scoped lang="scss">
.track-add {
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 100px;
    border: 1px solid #535353;
    border-radius: 500px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    background-color: transparent;
    transition: all 33ms cubic-bezier(0.3,0,0,1);
    color: white;
    margin-left: auto;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
