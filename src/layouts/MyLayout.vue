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
        <q-btn 
          v-if="userDetail.name"
          class="absolute-right q-mr-sm"
          icon="account_circle"
          dense
          flat 
          :label="userDetail.name" />
          <q-btn
          v-else 
          class="absolute-right q-mr-sm"
          icon="account_circle"
          dense
          flat 
          label="login" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MyLayout',

  data () {
    return {

    }
  },
  mounted() {
    this.handleAuthStageChanged()
  },
  created() {
    console.log(this.$route, 'test route')
    console.log(this.userDetail, 'userDetail')
  },
  computed: {
    ...mapState('store', ['userInfo']),
    userDetail() {
      return this.userInfo
    },
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
  },
  methods: {
    ...mapActions('store', ['handleAuthStageChanged'])
  }
}
</script>
