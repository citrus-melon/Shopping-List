<template>
  <h1>Shopping List</h1>
  <div class="actionStrip">
    <input type="checkbox" id="edit-button" class="hidden-checkbox" v-model="editing" @click="editBtnClick"><label for="edit-button" class="button" tabindex="0">Edit</label>
    <button type="button" @click="focusOrNew(items.length)" class="button">Add Item</button>
  </div>
  <ol id="main-list">
    <todo-item
      v-for="(item, index) in items"
      v-model="item.text"
      v-model:completed="item.completed"
      v-bind:key="item.id"
      v-bind:last="index == items.length-1"
      v-bind:editing="editing"
      :ref="setItemRef"
      @remove="removeItem(index)"
      @next="focusOrNew(index+1)"
    ></todo-item>
  </ol>
</template>

<script>
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'App',
  components: {
    TodoItem
  },
  data() {
    return {
      editing:false,
      items: [
        { id: 0, text: 'Vegetables', completed: false },
        { id: 1, text: 'Cheese', completed: false },
        { id: 2, text: 'Whatever else humans are supposed to eat', completed: false }
      ],
      nextId: 3,
      itemRefs: []
    }
  },
  methods: {
    removeItem (index) {
      this.items.splice(index, 1);
    },
    focusItem (index) {
      this.editing = true;
      this.$nextTick(() => {
        this.itemRefs[index].focus();
      });
    },
    focusOrNew (index) {
      if (this.items[index] === undefined) {
        this.items.push({id: this.nextId++, text: ''});
      }
      this.focusItem(index);
    },
    editBtnClick () {
      if(!this.editing) this.focusOrNew(0);
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
  },
  beforeUpdate () {
    this.itemRefs = []
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

/*MAIN LIST*/
#main-list {
  display: block;
  list-style: none;
  
  font-size: 2em;
}

#main-list:empty::after {
  content: 'Press edit to add an item!';
  opacity: 50%;
}

/* BUTTONS */
.actionStrip {
  margin: 1em 0;
}
.actionStrip > *:not(:last-child) {
  margin-right: 0.5em;
}

.button {
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  border: none;
  outline: none;
  font-size: 1em;

  padding: 0.5em 1em;
  color: var(--accent-color);
  background-color: var(--space-color);
  box-shadow: var(--shadow-color) 0 3px 6px;
  border-radius: 9999px;
  transition: transform 0.3s, background-color 0.3s, color 0.3s;
  transform: translateZ(0);
}

.button:hover, .button:focus {
  transform: translateZ(0) scale(1.1);
}

.button:active, .hidden-checkbox:checked + label {
  color: var(--space-color);
  background-color: var(--accent-color);
}

.hidden-checkbox {
  display: none;
}
</style>
