<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" cols="*">
                <Label class="fa" :text="'fa-chevron-left' | fonticon" style="font-size:25" @tap="$navigateBack" horizontalAlignment="left"/>
                <Label class="fa" :text="'fa-bars' | fonticon" style="font-size:25;margin-left:45" @tap="openDrawer()" horizontalAlignment="left"/>
                <Label class="title" text="TOODOO"  col="2" horizontalAlignment="center" />
                <Label v-if="!isEdit" class="fa" :text="'fa-pencil' | fonticon" style="font-size:30;margin-right:45" @tap="edit" col="3" horizontalAlignment="right"/>
                <Label v-if="isEdit" class="fa" :text="'fa-floppy-o' | fonticon" style="font-size:30;margin-right:0" @tap="save" col="4" horizontalAlignment="right"/>
                <Label v-if="!isEdit" class="fa delete-button" :text="'fa-trash' | fonticon" style="font-size:30" @tap="deleteTodo" col="4" horizontalAlignment="right"/>
            </GridLayout>
        </ActionBar>

        <GridLayout columns="*" rows="50, 150" style="padding-top:10">
            <TextField v-model="todo.title" class="todo-title" :class="isEdit ? 'edition':''" :editable="isEdit" hint="Title" row="0"/>
            <TextView v-model="todo.description" class="todo-description" :class="isEdit ? 'edition':''" :editable="isEdit" hint="Description" :text="todo.description" row="1" />
        </GridLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'

    export default {
        mixins: [ sideDrawer ],
        data() {
            return {
                todo: {},
                isEdit: false,
            }
        },
        methods: {
            edit() {
                this.isEdit = !this.isEdit;
            },

            save() {
                this.isEdit = false;
                this.$store.dispatch('editTodo', this.todo);
            },

            deleteTodo() {
                let self = this;
                confirm('Are you sure you want to delete this Todo ?')
                    .then(result => {
                        if(result) {
                            self.$store.dispatch('deleteTodo', this.todo.id);
                            self.$navigateTo(this.$routes.Home, {
                                animated: true,
                                transition: { name: 'slideRight', duration: 300, curve: 'easeIn'}
                            });
                        }
                    });
            }
        },
        created() {
            this.todo = Object.assign({}, this.$store.getters.todo);
        }
    }
</script>

<style scoped>
    .todo-title, .todo-description {
        padding:5 5 5 5;
        border-bottom-width: 0;
    }

    .todo-title {
        font-size:25px;
        padding-bottom:20px;
        border-bottom-width: 1px;
        border-bottom-color: lightgray;
        border-bottom-style: solid;
    }

    .todo-description {
        font-size:16
    }

    .todo-title.edition, .todo-description.edition {
        background-color: #d4d3d3;
    }

    .edit-button, .delete-button, .back-button {
        color: #ffffff;
    }

    .edit-button {
        color: darkgreen;
    }

    .delete-button {
        color: indianred;
    }

    .back-button {
        color: #ffffff;
    }
</style>
