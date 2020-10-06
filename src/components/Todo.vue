<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" :text="todo.title"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>
                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>
        </RadSideDrawer>

        <GridLayout columns="*" rows="*, 50">
            <Label class="list-view-item" :text="todo.title + ' -- ' + todo.description" />
            <Button text="Back" @tap="$navigateBack" row="1" col="0"/>
        </GridLayout>s
    </Page>
</template>

<script >
    export default {
        data() {
            return {
                todo: {},
            }
        },
        methods: {

        },
        created() {
            this.todo = this.$store.getters.todo;
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }

    .list-view-item {
        padding: 8 16;
        color: #000000;
        font-size: 20;
        /*border-bottom-color: #000000;*/
        /*border-bottom-width: 1px;*/
        /*border-bottom-style: solid;*/
    }
</style>
