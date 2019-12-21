<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
         <q-btn 
          v-if="$route.fullPath.includes('/Chat')"
          v-go-back.single
          icon="arrow_back"
          dense
          flat 
          label="Back" />
        <q-toolbar-title
         class="absolute-center"
        >
          {{title}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {

    }
  },
  created() {
    console.log(this.$route, 'test route')
  },
  computed: {
    title() {
      let title = ''
      let fullPath = this.$route.fullPath
      if(fullPath == '/') {
        return title = 'Users'
      } else if(fullPath == '/Auth') {
        return title = 'Auth'
      } else if(fullPath = '/Chat') {
        return title = 'Chat'
      }
      return title
    }
  }
}
</script>
