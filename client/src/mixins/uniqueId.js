let nextId = 0;

export default {
  beforeCreate() {
    this.$uniqueId = nextId;
    nextId += 1;
  },
};