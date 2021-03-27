const shoppingListApp = {
  data() {
    return {
      editing:false,
      items: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ],
      itemRefs: []
    }
  },
  methods: {
    remove(index) {
      this.items.splice(index, 1);
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  watch: {
    editing(state){
      if (state) {
        this.$nextTick(() => {
          this.itemRefs[0].focus();
        });
      }
    }
  }
}

const app = Vue.createApp(shoppingListApp)

app.component('todo-item', {
  props: ['todo', 'editing', 'last'],
  emits: ['remove'],
  template: `<li><span>{{ todo.text }}<input type="text" ref="input" v-if="editing" v-model="todo.text" @blur="handleBlur"/></span><span v-if="!last">, </span></li>`,
  methods: {
    handleBlur() {
      if(this.todo.text == '') {
        this.$emit('remove');
      }
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }
})

const vm = app.mount('#components-app')