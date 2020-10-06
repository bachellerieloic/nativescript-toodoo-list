<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" cols="*">
                <Label class="fa" :text="'fa-chevron-left' | fonticon" style="font-size:25" @tap="$navigateBack" horizontalAlignment="left"/>
                <Label class="fa" :text="'fa-bars' | fonticon" style="font-size:25;margin-left:45" @tap="openDrawer()" horizontalAlignment="left"/>
                <Label class="title" text="Add Todo"  col="2" horizontalAlignment="center" />
            </GridLayout>
        </ActionBar>

        <StackLayout style="padding-top:10">
            <TextField v-model="todo.title" hint="Title" class="todo-title" height="50"/>
            <TextView v-model="todo.description" hint="Description ?" class="todo-description" height="200"/>

            <GridLayout columns="*,*,*" height="80" class="is-done-inputs">
                <Label text="Not Done" col="0" horizontalAlignment="right" class="not-done-input" :class="!todo.isDone ? 'selected':''" @tap="todo.isDone = false" height="40"></Label>
                <Switch v-model="todo.isDone" col="1" horizontalAlignment="center" class="switch" :class="todo.isDone ? 'selected':''" height="40"/>
                <Label text="Done" col="2" horizontalAlignment="left" class="done-input" :class="todo.isDone ? 'selected':''" @tap="todo.isDone = true" height="40"></Label>
            </GridLayout>

            <GridLayout columns="*, *" row="50" width="100%" height="50" verticalAlignment="bottom">
                <Button text="Submit" @tap="cancel" col="0">
                    <FormattedString>
                        <Label text="Cancel " style="font-size:20;"/>
                        <Label class="fa" :text="'fa-times' | fonticon" style="font-size:20; color:indianred"/>
                    </FormattedString>
                </Button>

                <Button text="Submit" @tap="addTodo" col="1">
                    <FormattedString>
                        <Label text="Save " style="font-size:20;"/>
                        <Label class="fa" :text="'fa-floppy-o' | fonticon" style="font-size:20; color:forestgreen"/>
                    </FormattedString>
                </Button>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'

    export default {
        mixins: [ sideDrawer ],
        data() {
            return {
                todo: {title:'',description:'', isDone: false},
            }
        },
        methods: {
            addTodo() {
                this.todo.date = new Date().getTime();
                this.$store.dispatch('addTodo', this.todo);
                this.$navigateTo(this.$routes.Home, {
                    animated: true,
                    transition: { name: 'slideRight', duration: 300, curve: 'easeIn'}
                });
            },
            cancel() {
                this.todo.title = '';
                this.todo.description = '';
                this.$navigateTo(this.$routes.Home, {
                    animated: true,
                    transition: { name: 'slideRight', duration: 300, curve: 'easeIn'}
                });
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .todo-title, .todo-description {
        padding-left:10;
        background-color: #f3f3f3;
        font-size: 20;
        margin-bottom:10;
    }

    .is-done-inputs {
        margin-top:0;
        margin-bottom: 10;
    }

    .not-done-input, .done-input {
      font-size: 20px;
      padding: 5 10;
      border-width:2px;
      border-radius:20px;
    }

    .not-done-input {
        color:indianred;
        border-color:indianred;
    }

    .not-done-input.selected {
        color: #ffffff;
        background-color: indianred;
    }

    .done-input {
        color: forestgreen;
        border-color:forestgreen;
    }

    .done-input.selected {
        color: white;
        background-color:forestgreen;
    }

    .switch {
        color: indianred;
        margin:0 0 0 0;
        padding: 0;
    }

    .switch.selected {
        color: forestgreen;
    }

    .todo-description {
    }
</style>
