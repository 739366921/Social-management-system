<template>
    <div class="loading">
        <img src="../../assets/loading.gif" alt="">
    </div>
</template>
<style scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loading img {
  position: absolute;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  top: calc(50% - 300px);
  left: calc(50% - 100px);
}
</style>