<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
        <i :class="icon"></i>
      </span>
    </div>
    <input
      :name="name"
      :placeholder="placeholder"
      class="form-control form-control-lg"
      :class="{'is-invalid':error}"
      @input="$emit('input',$event.target.value)"
    />
    <div v-if="error" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    icon: String,
    name: String,
    placeholder: String,
    error: String,
  },
};
</script>

<style scoped>
</style>
