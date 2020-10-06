import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todo: {},
    todos: [
      {title: '1', description: 'test'},
      {title: '2', description: 'ok'},
      {title: '3', description: 'ok'},
      {title: '4', description: 'ok'},
      {title: '5', description: 'ok'},
      {title: '6', description: 'ok'},
      {title: '7', description: 'ok'},
      {title: '8', description: 'ok'},
      {title: '9', description: 'ok'},
      {title: '10', description: 'ok'},
      {title: '11', description: 'ok'},
      {title: '12', description: 'ok'},
      {title: '13', description: 'ok'},
      {title: '14', description: 'ok'},
    ],

  },
  mutations: {
    add(state, item) {
      state.todos.push(item);
    },
    setTodo(state, item){
      state.todo = item;
    },
    save(item, state) {

    },
    delete(item, state) {

    }
  },

  actions: {
    addTodo(context, todoItem) {
      context.commit('add', todoItem);
    },

    deleteTodo(context, todoItem) {
      context.commit('delete', todoItem);
    },

    setTodo(context, todoItem) {
      context.commit('setTodo', todoItem);
    }
  },

  getters: {
    todo(state) {
      return state.todo;
    },
    todos(state) {
      return state.todos;
    }
  },
});
