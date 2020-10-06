import {firebase} from '@nativescript/firebase';

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
    setTodos(state, todos){
        const todosArr = [];
        Object.keys(todos).forEach((key) => {
            todosArr.push({id:key, ...todos[key]});
        });
        state.todos = todosArr;
    },
    save(item, state) {

    },
    delete(item, state) {

    }
};

const actions = {
    addTodo(context, todoItem) {
        context.commit('add', todoItem);
        firebase.push('/todos', todoItem);
        firebase.getValue('/todos')
            .then(result => context.commit('setTodos', result.value))
            .catch(error => console.log("Error: " + error));
    },

    editTodo(context, todoItem) {
        let key = todoItem.id;
        delete todoItem.id;
        //update the element
        firebase.update('/todos/'+key, todoItem);
        //fetch all todos again
        // firebase.getValue('/todos')
        //     .then(result => context.commit('setTodos', result.value))
        //     .catch(error => console.log("Error: " + error));
    },

    deleteTodo(context, todoId) {
        firebase.remove("/todos/"+todoId);
    },

    setTodo(context, todoItem) {
        context.commit('setTodo', todoItem);
    },

    fetchTodos(context) {
        //fetch all todos
        firebase.getValue('/todos')
            .then(result => context.commit('setTodos', result.value))
            .catch(error => console.log("Error: " + error));
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