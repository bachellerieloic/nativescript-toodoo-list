<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="40, 50, *, *, *">
                <Label class="fa" :text="'fa-chevron-left' | fonticon" style="font-size:30" @tap="$navigateBack" col="0"/>
                <Label class="fa" :text="'fa-bars' | fonticon" style="font-size:30" @tap="openDrawer()" col="1"/>
                <Label class="title" text="Toodoo"  col="2"/>
                <Label v-if="!isEdit" class="fa" :text="'fa-pencil' | fonticon" style="font-size:30" @tap="edit" col="3"/>
                <Label v-if="isEdit" class="fa" :text="'fa-floppy-o' | fonticon" style="font-size:30" @tap="save" col="4"/>
                <Label v-if="!isEdit" class="fa" :text="'fa-trash-o' | fonticon" style="font-size:30" @tap="deleteTodo" col="4"/>
            </GridLayout>
        </ActionBar>

        <ActionBar>
            <GridLayout width="100%" cols="*">
                <Label class="fa" :text="'fa-chevron-left' | fonticon" style="font-size:25" @tap="$navigateBack" horizontalAlignment="left"/>
                <Label class="fa" :text="'fa-bars' | fonticon" style="font-size:25;margin-left:45" @tap="openDrawer()" horizontalAlignment="left"/>
                <Label class="title" text="TOODOO"  col="2" horizontalAlignment="center" />
                <Label v-if="!isEdit" class="fa" :text="'fa-pencil' | fonticon" style="font-size:30;margin-right:45" @tap="edit" col="3" horizontalAlignment="right"/>
                <Label v-if="isEdit" class="fa" :text="'fa-floppy-o' | fonticon" style="font-size:30;margin-right:0" @tap="save" col="4" horizontalAlignment="right"/>
                <Label v-if="!isEdit" class="fa" :text="'fa-trash-o' | fonticon" style="font-size:30" @tap="deleteTodo" col="4" horizontalAlignment="right"/>
            </GridLayout>
        </ActionBar>

        <GridLayout columns="*" rows="50, *" style="padding-left:10">
            <Label class="todo-title" :text="todo.title" row="0" />
            <TextView class="todo-description" editable="false" :text="todo.description" row="1" />
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
            },

            deleteTodo() {
                alert('Deleting ...');
            }
        },
        created() {
            this.todo = this.$store.getters.todo;
        }
    }
</script>

<style scoped>
    .todo-title, .todo-description {
        font-size:20px
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
