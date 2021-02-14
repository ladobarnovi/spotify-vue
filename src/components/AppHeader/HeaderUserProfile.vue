<template>
  <div
    class="header-user-profile"
    v-if="data"
    tabindex="1"
    @click="toggle"
    ref="el"
  >
    <img class="profile-image" :src="data.images[0].url" />
    <p>{{ data.display_name }}</p>
    <img src="@/assets/icons/chevron-down.svg" class="chevron" />

    <ul v-if="active" class="menu">
      <li>Account</li>
      <li>Profile</li>
      <li class="separator"></li>
      <li>Log Out</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { UserProfile } from "src/api/me";
import { useFocusOutAction } from "@/hooks/focusOut";

export default defineComponent({
  props: {
    data: {
      type: Object as () => UserProfile,
      required: true
    }
  },
  setup() {
    const el = ref();
    const { active, toggle } = useFocusOutAction(el);

    return {
      active,
      toggle,
      el
    };
  }
});
</script>

<style scoped lang="scss">
.header-user-profile {
  margin-left: auto;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2px;
  border-radius: 23px;
  cursor: pointer;
  outline: none;
  position: relative;

  .profile-image {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }

  p {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: normal;
  }

  .chevron {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    margin-right: 6px;
  }

  .menu {
    position: absolute;
    right: 0;
    top: calc(100% + 4px);
    background-color: #282828;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
    padding: 4px 4px 0;

    li {
      min-width: 160px;
      font-size: 14px;
      color: #b3b3b3;
      padding: 12px 8px;
      margin-bottom: 4px;
      border-radius: 2px;

      &:hover {
        color: white;
        background-color: hsla(0,0%,100%,.1);
      }

      &.separator {
        padding: 0;
        margin: 0;
        height: 1px;
        background-color: #404040;
      }
    }
  }
}
</style>
