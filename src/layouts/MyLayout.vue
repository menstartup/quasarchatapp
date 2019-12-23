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
      chatTitle: ''
    }
  },
  mounted() {
    // this.handleAuthStageChanged()
  },
  created() {
    console.log(this.$route, 'test route')
    console.log(this.userDetail, 'userDetail')
  },
  computed: {
    ...mapState('store', ['userInfo', 'users']),
    userDetail() {
      return this.userInfo
    },
    onChatUser() {
      // return this.users[this.$route.fullPath.otheruserid].name
    },
    title() {
      let title = ''
      let fullPath = this.$route.fullPath
      if(fullPath == '/') {
        return title = 'Users'
      } else if(fullPath == '/Auth') {
        return title = 'Auth'
      } else if(fullPath.includes('/Chat')) {
        return title = this.chatTitle
      }
      return title
    }
  },
  async beforeUpdate() {
    if(this.$route.fullPath.includes('/Chat')) {
       this.chatTitle = await this.users[this.$route.params.otheruserid].name
       console.log(this.chatTitle, 'chat titlleeeee')
       return this.chatTitle
    }
      
  },
  methods: {
    ...mapActions('store', ['handleAuthStageChanged'])
  }
}
</script>
