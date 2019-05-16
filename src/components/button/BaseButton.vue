<template>
  <button
    :type="type"
    class="base-button"
    :class="[{'disabled': disabled}, size]"
    @click="clickHandler"
  >
    <slot/>
  </button>
</template>
<script type = 'text/javascript'>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: 'medium' // medium / small / mini
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    clickHandler() {
      this.$emit('click')
    }
  }
}
</script>
<style lang='scss' scoped>
.base-button {
  width: 100%;
  height: 80px;
  background: linear-gradient(to right, #00a3f9, #0071f2);
  border-radius: 8px;
  color: #fff;
  border: none;
  &.medium {
    font-size: 40px;
  }
  &.small {
  }
  &.mini {
  }
  &.disabled {
  }
}
</style>
