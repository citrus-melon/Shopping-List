<template>
  <h1>Shopping List</h1>
  <list
    v-model:items="mainList"
    :nextId="nextId"
    @useId="nextId++"
    @item-action="toggleCompletion"
  />
  <styled-button class="archive-tab" @click="archiveOpen=true">Archive</styled-button>
  <div class="archive-overlay" v-if="archiveOpen">
    <h1>Archive</h1>
    <list
      :items="archiveList"
      :nextId="nextId"
      @useId="nextId++"
    >
      <styled-button class="archive-close" @click="archiveOpen=false">Close</styled-button>
    </list>
  </div>
</template>

<script>
import List from './components/List.vue'
import StyledButton from './components/StyledButton.vue';

export default {
  name: 'App',
  components: {
    List,
    StyledButton
  },
  data() {
    return {
      mainList: [],
      archiveList: [],
      nextId: 0,
      archiveOpen: false
    }
  },
  created() {
    const storedMainList = localStorage.getItem('mainList');
    if (storedMainList) this.mainList = JSON.parse(storedMainList);
    const storedArchiveList = localStorage.getItem('archiveList');
    if (storedArchiveList) this.archiveList = JSON.parse(storedArchiveList);
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
    archiveList: {
      handler(newValue) {
        localStorage.setItem('archiveList', JSON.stringify(newValue));
      },
      deep: true
    },
    nextId(newValue) {
      localStorage.setItem('nextId', newValue);
    }
  },
  methods: {
    toggleCompletion(index) {
      const item = this.mainList[index];
      item.completed = !item.completed;
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

/* ARCHIVE */
.archive-overlay {
  background: var(--accent-color);
  color: var(--space-color);

  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 80%;

  padding: 1em;
  border-radius: 2em 2em 0 0;
}
.archive-overlay h1 {
  color: var(--space-color);
}

.button.archive-tab {
  position: absolute;
  bottom: 0;
  padding-bottom: 0.5em;
  border-radius: 1em 1em 0 0;

  background: var(--accent-color);
  color: var(--space-color);

  transform: none;
}
.button.archive-tab:hover {
  transform: translateY(-10%) scale(1.1);
}
</style>
