<template lang="html">
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="40, 2*, 40">
                <Label class="fa" :text="'fa-bars' | fonticon" style="font-size:30px" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Toodoo"  col="1"/>
                <Label class="fa" :text="'fa-plus' | fonticon" style="font-size:30px; margin-left:auto; margin-right:auto" @tap="addItem" col="2"/>
            </GridLayout>
        </ActionBar>

        <GridLayout ~mainContent rows="30,*">
            <Button text="Fetch" style="font-size:25px;  margin-right:80" @tap="fetch" row="0"/>
            <ListView for="todo in todos" @itemTap="onItemTap" row="1">
                <v-template>
                    <StackLayout>
                        <Label class="todo-title" :text="todo.title"/>
                        <Label class="todo-description" :text="todo.description"/>
                    </StackLayout>
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
            onItemTap(event) {
                console.log('tapped : ', event.item);
                this.$store.dispatch('setTodo', event.item);
                console.log('store todo', this.$store.getters.todo);
                this.$navigateTo(this.$routes.Todo)
            },
            addItem() {
                this.$navigateTo(this.$routes.AddTodo)
                this.todos = this.$store.getters.todos;
            },
            onLongPress() {
                confirm('Are you sure you want to delete this Toodoo')
                    .then(result => {
                        alert(result);
                    });
            },
            fetch() {
                console.log('FETCHING')
                this.$firebase.getValue('/todos').then(function(result) {
                    this.$store.dispatch('setTodos', result.value);
                });
                console.log('CONSOLE ********', this.$store.getters.todos);
            }
        },
        created() {
            // this.todos = this.$store.getters.todos;
            this.$firebase.getValue('/todos').then(function(result) {
                console.log('RESULT **************', result.value);
                this.$store.dispatch('setTodos', result.value);
                console.log('********', this.$store.getters.todos);
            });


            var onChildEvent = function(result) {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
            };

            // listen to changes in the /todos path
            this.$firebase.addChildEventListener(onChildEvent, "/todos").then(
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
</style>