<template>
  <div class="main-list-wrapper">
    <h1>Shopping List</h1>
    <list
      v-model:items="mainList"
      :nextId="nextId"
      @useId="nextId++"
      @item-action="mainListAction"
      :selectionActions="['Move to Archive', 'Toggle Completion']"
    ></list>
  </div>
  <archive-wrapper>
    <list
      :items="archiveList"
      :nextId="nextId"
      @useId="nextId++"
      @item-action="archiveListAction"
      :selectionActions="['Move to List']"
      :inverted="true"
    ></list>
  </archive-wrapper>
</template>

<script>
import ArchiveWrapper from './components/ArchiveWrapper.vue';
import List from './components/List.vue'
import StyledButton from './components/StyledButton.vue';

export default {
  name: 'App',
  components: {
    ArchiveWrapper,
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
    },
    archive(index) {
      const item = this.mainList.splice(index, 1)[0];
      this.archiveList.splice(index, 0, item);
    },
    unarchive(index) {
      const item = this.archiveList.splice(index, 1)[0];
      this.mainList.push(item);
    },
    mainListAction(action, item, index) {
      if (action === 'Move to Archive') {
        this.archive(index);
      } else {
        this.toggleCompletion(index);
      }
    },
    archiveListAction(action, item, index) {
      this.unarchive(index);
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
  overflow: hidden;
}

/* APP CONTAINER */
#app {
  font-family: Arial, Helvetica, sans-serif;

  width: 100%;
  height: 100%;
  overflow: hidden;

  color: var(--text-color);
  background-color: var(--bkg-color);

  /* Color theme */
  --text-color: #221466;
  --bkg-color: #f8f6ff;
  --accent-color: #5947b3;
  --lighter-accent-color: #6b5bbe;
  --darker-accent-color: #4c3d99;
  --space-color: #fff;
  --shadow-color: #22146633;
}

/* MAIN LIST */
.main-list-wrapper {
  height: 100%;
  padding: 1em;
  overflow: auto;
}

h1 {
  color: var(--accent-color);
}
</style>
