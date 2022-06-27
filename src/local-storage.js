import Storage from 'vue-ls';

const { ls } = Storage.useStorage({
  namespace: 'bree_',
  name: 'ls',
  storage: 'local'
});

export default ls;
