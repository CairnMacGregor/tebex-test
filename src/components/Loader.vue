<template>
    <div class="loader">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loader'
  };
  </script>
  
  <style lang = "scss">
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid $brand-blue;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>