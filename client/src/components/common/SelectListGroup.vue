<template>
  <div class="form-group">
    <select
      :name="name"
      class="form-control form-control-lg"
      :value="value"
      :class="{'is-invalid':error}"
      @input="$emit('input',$event.target.value)"
    >
      <option v-for="(option,index) in options" :key="index" value="option.value">{{option.value}}</option>
    </select>
    <div v-if="error" class="invalid-feedback">{{error}}</div>
    <div v-if="info" class="text-muted small">{{info}}</div>
  </div>
</template>

<script>
export default {
  name: "SelectListGroup",
  props: {
    value: String,
    name: String,
    error: String,
    info: String,
    options: Array,
  },
};
</script>

<style scoped>
</style>
