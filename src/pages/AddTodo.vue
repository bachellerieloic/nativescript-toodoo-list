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
            <TextView v-model="todo.description" hint="What to do ?" class="todo-description" height="150"/>
            <GridLayout columns="*, *" row="50" width="100%" height="50">
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
                todo: {title:'',description:''},
            }
        },
        methods: {
            addTodo() {
                this.$store.dispatch('addTodo', this.todo);
                this.$navigateTo(this.$routes.Home);
            },
            cancel() {
                this.todo.title = '';
                this.todo.description = '';
                this.$navigateTo(this.$routes.Home);
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .todo-title, .todo-description {
        padding-left:10;
        background-color: #eeecec;
        font-size: 20;
        margin-bottom:10;
    }

    .todo-description {
    }
</style>
