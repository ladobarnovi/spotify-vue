<template>
  <div class="track-date">
    {{ formattedDate }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import moment from "moment";

export default defineComponent({
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  setup(props) {
    const formattedDate = moment(props.date).format("MMM DD, yyyy");

    return {
      formattedDate
    };
  }
})
</script>

<style scoped lang="scss">
.track-item {
  .track-date {
    color: #b3b3b3;
    letter-spacing: normal;
  }

  &:hover {
    .track-date {
      color: white;
    }
  }
}
</style>
