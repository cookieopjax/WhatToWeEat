<script setup></script>

<template>
  <div
    class="h-screen w-screen bg-wte-bg flex items-center justify-center flex-col"
  >
    <div class="loader">
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--text"></div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  height: 20px;
  width: 250px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.loader--dot {
  animation-name: loader;
  animation-timing-function: ease-in-out;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: black;
  position: absolute;
  border: 2px solid white;
}
.loader--dot:first-child {
  background-color: rgb(27, 162, 90);
  animation-delay: 0.5s;
}
.loader--dot:nth-child(2) {
  background-color: #8c6daf;
  animation-delay: 0.4s;
}
.loader--dot:nth-child(3) {
  background-color: rgb(210, 55, 85);
  animation-delay: 0.3s;
}
.loader--dot:nth-child(4) {
  background-color: rgb(252, 176, 64);
  animation-delay: 0.2s;
}
.loader--dot:nth-child(5) {
  background-color: #60beeb;
  animation-delay: 0.1s;
}
.loader--dot:nth-child(6) {
  background-color: #fbef5a;
  animation-delay: 0s;
}
.loader--text {
  position: absolute;
  top: 200%;
  left: 0;
  right: 0;
  width: 10rem;
  margin: auto;
  font-size: 1.5rem;
  text-align: center;
}
.loader--text:after {
  content: "稍等我一下";
  animation-name: loading-text;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes loader {
  15% {
    transform: translateX(0);
  }
  45% {
    transform: translateX(230px);
  }
  65% {
    transform: translateX(230px);
  }
  95% {
    transform: translateX(0);
  }
}
@keyframes loading-text {
  0% {
    content: "稍等我一下";
  }
  25% {
    content: "稍等我一下.";
  }
  50% {
    content: "稍等我一下..";
  }
  75% {
    content: "稍等我一下...";
  }
}
</style>
