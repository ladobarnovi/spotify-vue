<template>
  <div class="artist-header" :style="style">
    <div class="content">
      <div class="image-container">
        <img :src="image" />
      </div>
      <div class="group">
        <p
          class="name"
          :class="{
            small: name.length > 24,
            medium: name.length > 20
          }"
        >
          {{ name }}
        </p>
        <p class="listeners">{{ listeners }} monthly listeners</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {imageColor} from "@/utils/image";

export default defineComponent({
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    listeners: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const style = ref<any>();

    imageColor(props.image as string).then(rgb => {
      style.value = {
        "background-color": `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        "box-shadow": `0px 13px 120px 120px rgba(${rgb.r}, ${rgb.g}, ${rgb.b},0.5)`
      };
    });

    return {
      style
    };
  }
});
</script>

<style scoped lang="scss">
.artist-header {
  padding: 0 32px 24px;
  min-height: 340px;
  position: relative;
  display: flex;
  align-items: flex-end;

  &:after {
    content: "";
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    position: relative;
    z-index: 1;

    .image-container {
      width: 232px;
      height: 232px;
      margin-right: 24px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
      }

      @media only screen and (max-width: 1280px) {
        width: 192px;
        height: 192px;
      }
    }

    .group {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: white;
      margin-top: 8px;
      font-weight: 500;
      line-height: 20px;

      .name {
        font-size: 96px;
        line-height: 1;
        margin: 8px 0 0;
        font-weight: 900;
        letter-spacing: -0.04em;
        padding: 0.08em 0;

        &.medium {
          padding: 0.08em 0;
          font-size: 72px;
          line-height: 72px;
        }

        &.small {
          font-size: 48px;
          line-height: 48px;
        }
      }

      .listeners {
        font-size: 16px;
        line-height: 2;
        margin-top: 4px;
      }
    }
  }
}
</style>
