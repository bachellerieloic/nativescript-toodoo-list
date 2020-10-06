const state = {
    todo: {},
    todos: [
        {title: 'Groceries', description: 'test'},
        {title: 'Monday', description: 'ok'},
        {title: 'List for Melissa', description: 'ok'},
    ],
};

const mutations = {
    add(state, item) {
        state.todos.push(item);
    },
    setTodo(state, item){
        state.todo = item;
    },
    setTodos(state, items){
        state.todos = items;
    },
    save(item, state) {

    },
    delete(item, state) {

    }
};

const actions = {
    addTodo(context, todoItem) {
        context.commit('add', todoItem);
    },

    deleteTodo(context, todoItem) {
        context.commit('delete', todoItem);
    },

    setTodo(context, todoItem) {
        context.commit('setTodo', todoItem);
    },

    setTodos(context, todos) {
        console.log('VUEX *************', todos);
        context.commit('setTodos', todos);
    },
};

const getters = {
    todo(state) {
        return state.todo;
    },
    todos(state) {
        return state.todos;
    }
};


// export this module.
export default {
    state,
    mutations,
    actions,
    getters
}