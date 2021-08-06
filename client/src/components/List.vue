<template>
  <div class="actionStrip">
    <toggle-button v-model="editing" @click="editBtnClick">Edit</toggle-button>
    <styled-button @click="insertOrFocusItem(items.length)">Add Item</styled-button>
    <slot></slot>
  </div>
  <ol class="list">
    <list-item
      v-for="(item, index) in items"
      v-model:label="item.label"
      v-model:completed="item.completed"
      v-bind:key="item.id"
      v-bind:item-id="item.id"
      v-bind:last="index == items.length - 1"
      v-bind:editing="editing"
      :ref="setItemRef"
      @click="itemAction(index)"
      @remove="removeItem(index)"
      @focus-next="insertOrFocusItem(index + 1)"
      @insert-after="insertAndFocusItem(index + 1)"
    ></list-item>
  </ol>
</template>

<script>
import ListItem from './ListItem.vue';
import StyledButton from './StyledButton.vue';
import ToggleButton from './ToggleButton.vue';

export default {
  name: 'List',
  components: {ListItem, StyledButton, ToggleButton},
  props: ['items', 'nextId'],
  emits: ['update:items', 'itemAction', 'useId'],
  data() {
    return {
      editing:false,
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
      const item = {id: this.nextId, label: label};
      this.items.splice(index, 0, item);
      this.$emit('useId');
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
    itemAction (index) {
      if (this.editing) return;
      this.$emit('itemAction', index);
    },
    editBtnClick () {
      if(!this.editing) this.insertOrFocusItem(0);
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs[el.itemId] = el;
      }
    },
  },
  beforeUpdate () {
    this.itemRefs = {}
  },
  watch: {
    items: {
      handler(newValue) {
        this.$emit("update:items", newValue);
      },
      deep: true
    }
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

/* ACTION STRIP */
.actionStrip {
  margin: 1em 0;
}
.actionStrip > *:not(:last-child) {
  margin-right: 0.5em;
}
</style>
