const shoppingListApp = {
  data() {
    return {
      editing:false,
      items: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
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

const app = Vue.createApp(shoppingListApp)

app.component('todo-item', {
  props: ['todo', 'editing', 'last'],
  emits: ['remove', 'next'],
  template: `<li><span>{{ todo.text }}<input type="text" ref="input" v-if="editing" v-model="todo.text" @keydown.tab.exact.prevent="handleNext" @keyup.enter="handleNext" @blur="handleBlur"/></span><span v-if="!last">, </span></li>`,
  methods: {
    handleBlur() {
      if(this.todo.text == '') {
        this.$emit('remove');
      }
    },
    handleNext() {
      this.$emit('next');
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }
})

const vm = app.mount('#app')