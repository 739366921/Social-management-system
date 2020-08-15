<template>
  <div class="form-group">
    <textarea
      :name="name"
      :placeholder="placeholder"
      class="form-control form-control-lg"
      :class="{'is-invalid':error}"
      @input="$emit('input',$event.target.value)"
    />
    <div v-if="error" class="invalid-feedback">{{error}}</div>
    <div v-if="info" class="text-muted small">{{info}}</div>
  </div>
</template>

<script>
export default {
  name: "TextAreaGroup",
  props: {
    name: String,
    placeholder: String,
    error: String,
    info: String,
  },
};
</script>

<style scoped>
</style>
