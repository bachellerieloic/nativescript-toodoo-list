<template lang="html">
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="40, 2*, 40,40">
                <Label class="fa" :text="'fa-bars' | fonticon" style="font-size:30px" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Toodoo"  col="1"/>
                <Label class="title" text="ADD" col="2"/>
                <Label class="fa" :text="'fa-plus-circle' | fonticon" style="font-size:30px; margin-left:auto; margin-right:auto" @tap="addItem" col="3"/>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent rows="*">
            <ListView for="todo in $store.getters.todos" row="0">
                <v-template>
                    <GridLayout columns="80, *, 50" :class="todo.isDone ? 'isDone':''" isPassThroughParentEnabled="false">
                        <Switch @tap="toggleTodo(todo)" :checked="todo.isDone" class="switch" :color="todo.isDone ?'forestgreen':'indianred'" col="0" horizontalAlignment="left"/>
                        <StackLayout @tap="onItemTap(todo)" col="1">
                            <Label class="todo-title" :text="todo.title"/>
                            <Label class="todo-description" :text="todo.description"/>
                        </StackLayout>
                        <Label class="fa chevron" :text="'fa-chevron-right' | fonticon" style="font-size:20px" @tap="onItemTap(todo)" col="2" pageTransition="slide"/>

<!--                        <Label v-if="todo.isDone" class="fa done" :text="'fa-check-circle-o' | fonticon" style="font-size:35px;" col="1" @tap="toggleTodo(todo)"/>-->
<!--                        <Label v-if="!todo.isDone" class="fa not-done" :text="'fa-times-circle' | fonticon" style="font-size:35px;" col="1" @tap="toggleTodo(todo)"/>-->

                    </GridLayout>
                </v-template>
            </ListView>

        </GridLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'

    export default {
        mixins: [ sideDrawer ],
        data () {
            return {
                todos: [],
            }
        },
        methods: {
            onItemTap(item) {
                console.log('ITEM TAP *******');
                this.$store.dispatch('setTodo', item);
                // this.$navigateTo(this.$routes.Todo)
                this.$navigateTo(this.$routes.Todo, {
                    animated: true,
                    transition: { name: 'slide', duration: 300, curve: 'easeIn'}
                });
            },
            toggleTodo(todo) {
                this.ignoreTap = true;
                // Copy without reference, otherwise it gives a Vuex error, modification of state not made through a mutation.
                let todoObject = Object.assign({}, todo);
                todoObject.isDone = !todoObject.isDone;
                this.$store.dispatch('editTodo', todoObject);
                // this.$store.dispatch('fetchTodos');
            },
            addItem() {
                this.$navigateTo(this.$routes.AddTodo, {
                    animated: true,
                    transition: { name: 'slide', duration: 300, curve: 'easeIn'}
                });
            },
        },
        mounted() {
            this.$store.dispatch('fetchTodos');
            this.todos = this.$store.getters.todos;
            let self = this;

            var onChildEvent = function(result) {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
                self.$store.dispatch('fetchTodos');
            };

            // listen to changes in the /todos path
            this.$firebase.addChildEventListener(onChildEvent, "/todos").then(
                function(listenerWrapper) {
                    var path = listenerWrapper.path;
                    var listeners = listenerWrapper.listeners; // an Array of listeners added
                }
            );

            var onValueEvent = function(result) {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
                self.$store.dispatch('fetchTodos');
            };

            // listen to changes in the /companies path
            this.$firebase.addValueEventListener(onValueEvent, "/todos").then(
                function(listenerWrapper) {
                    var path = listenerWrapper.path;
                    var listeners = listenerWrapper.listeners; // an Array of listeners added
                    // you can store the wrapper somewhere to later call 'removeEventListeners'
                }
            );
        }
    }
</script>

<style scoped>
    .button-add-item {
        background-color: transparent;
        color: #ffffff;
    }

    .todo-title {
        font-size: 20px;
    }

    .todo-description {
        font-size: 10px
    }

    .switch {
        color: indianred;
        margin:0 0 0 0;
        padding: 0;
        border-left-color: #dbdbdb;
        border-left-width: 1px;
        border-left-style: solid;
    }

    .switch.selected {
        color: forestgreen !important;
    }

    .isDone {
        background-color: #f3f3f3;
    }

    .fa.chevron {
        color: #dbdbdb;
    }
</style>