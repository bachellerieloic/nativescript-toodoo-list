<template lang="html">
  <ScrollView>
    <StackLayout width="100%">
      <Label class="drawer-header" text="TOODOO"/>
      <Label v-for="(page, i) in pages" @tap="goToPage(page.component)" class="drawer-item" :text="page.name" :key="i"/>
    </StackLayout>
  </ScrollView>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
export default {
  mixins: [sideDrawer],
  data () {
    return {
      // define our pages, making sure the component matches that defined in /app/router/index.js
      pages: [
        { name: 'Home', component: this.$routes.Home },
        { name: 'Archived', component: this.$routes.Archived }
      ]
    }
  },
  methods: {
    goToPage (pageComponent) {
      this.$navigateTo(pageComponent)
      this.closeDrawer()
    }
  }
}
</script>

<style lang="css">
</style>