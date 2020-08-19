<template>
  <div class="form-group">
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      class="form-control form-control-lg"
      :disabled="disabled"
      :class="{'is-invalid':error}"
      @input="$emit('input',$event.target.value)"
    />
    <div v-if="error" class="invalid-feedback">{{error}}</div>
    <div v-if="info" class="text-muted small">{{info}}</div>
  </div>
</template>

<script>
export default {
  name: "TextFieldGroup",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: String,
    name: String,
    placeholder: String,
    error: String,
    info: String,
    disabled: String,
  },
};
</script>

<style scoped>
</style>
