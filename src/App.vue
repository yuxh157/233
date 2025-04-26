<script setup></script>

<template>
  <div class="app-wrapper">
    <div class="phone-container">
      <div class="app">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
.app-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  overflow: hidden;
}

.phone-container {
  position: relative;
  width: 375px;
  height: 812px;
  background-color: white;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 10px solid #000;
}

.app {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>
