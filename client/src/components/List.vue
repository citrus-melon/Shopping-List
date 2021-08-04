<template>
  <div class="actionStrip">
    <input type="checkbox" id="edit-button" class="hidden-checkbox" v-model="editing" @click="editBtnClick">
    <label for="edit-button" class="button" tabindex="0">Edit</label>
    <button type="button" @click="insertOrFocusItem(items.length)" class="button">Add Item</button>
  </div>
  <ol class="list">
    <list-item
      v-for="(item, index) in items"
      v-model:label="item.label"
      v-model:completed="item.completed"
      v-bind:key="item.id"
      v-bind:id="item.id"
      v-bind:last="index == items.length - 1"
      v-bind:editing="editing"
      :ref="setItemRef"
      @remove="removeItem(index)"
      @focus-next="insertOrFocusItem(index + 1)"
      @insert-after="insertAndFocusItem(index + 1)"
    ></list-item>
  </ol>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  name: 'List',
  components: {
    ListItem
  },
  props: ['storageKey'],
  data() {
    return {
      editing:false,
      items: [],
      nextId: 0,
      itemRefs: {}
    }
  },
  methods: {
    removeItem (index) {
      this.items.splice(index, 1);
    },
    focusItem (id) {
      this.editing = true;
      this.$nextTick(() => {
        this.itemRefs[id].focus();
      });
    },
    insertItem (index, label) {
      if (!label) label = '';
      const item = {id: this.nextId++, label: label};
      this.items.splice(index, 0, item);
      return item;
    },
    insertAndFocusItem (index, label) {
      const item = this.insertItem(index, label);
      this.focusItem(item.id);
    },
    insertOrFocusItem (index) {
      if (this.items[index] === undefined) {
        this.insertAndFocusItem(index)
      } else {
        this.focusItem(this.items[index].id);
      }
    },
    editBtnClick () {
      if(!this.editing) this.insertOrFocusItem(0);
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs[el.id] = el;
      }
    },
  },
  beforeUpdate () {
    this.itemRefs = {}
  },
  watch: {
    items: {
      handler(newValue) {
        localStorage.setItem(this.storageKey + '_items', JSON.stringify(newValue));
      },
      deep: true
    },
    nextId(newValue) {
      localStorage.setItem(this.storageKey + '_nextId', newValue);
    }
  },
  created() {
    const storedItems = localStorage.getItem(this.storageKey + '_items');
    if (storedItems) this.items = JSON.parse(storedItems);
    const storedNextId = localStorage.getItem(this.storageKey + '_nextId');
    if (storedNextId) this.nextId = parseInt(storedNextId);
  }
};
</script>

<style>
.list {
  display: block;
  list-style: none;
  
  font-size: 2em;
}

.list:empty::after {
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
