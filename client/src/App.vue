<template>
  <h1>Shopping List</h1>
  <list
    v-model:items="mainList"
    :nextId="nextId"
    @useId="nextId++"
  />
</template>

<script>
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    List
  },
  data() {
    return {
      mainList: [],
      nextId: 0
    }
  },
  created() {
    const storedMainList = localStorage.getItem('mainList');
    if (storedMainList) this.mainList = JSON.parse(storedMainList);
    const storedNextId = localStorage.getItem('nextId');
    if (storedNextId) this.nextId = JSON.parse(storedNextId);
  },
  watch: {
    mainList: {
      handler(newValue) {
        localStorage.setItem('mainList', JSON.stringify(newValue));
      },
      deep: true
    },
    nextId(newValue) {
      localStorage.setItem('nextId', newValue);
    }
  }
}
</script>

<style>
/* GLOBAL STUFF */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body, html {
  width: 100%;
  height: 100%;
}

/* APP CONTAINER */
#app {
  font-family: Arial, Helvetica, sans-serif;

  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 1em;

  color: var(--text-color);
  background-color: var(--bkg-color);

  /* Color theme */
  --text-color: #221466;
  --bkg-color: #f8f6ff;
  --accent-color: #5947b3;
  --space-color: #fff;
  --shadow-color: #22146633;
}

/* BIG TITLE */
h1 {
  color: var(--accent-color);
}
</style>
