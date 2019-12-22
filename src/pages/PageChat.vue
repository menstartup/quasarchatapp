<template>
  <q-page
   class="flex column"
  >
      <div 
       class="q-pa-md column col justify-end"
      >
        <q-chat-message
            v-for="(message, index) in allMessage"
            :key="index"
            :name="message.from == 'me' ? userInfo.name : mixin"
            :avatar="message.avatar"
            :text="[message.text]"
            stamp="7 minutes ago"
            :sent="message.from == 'me' ? true : false"
            :bg-color="message.from == 'me' ? 'amber-7' : 'blue'"

        />
    </div>
      <q-footer elevated>
          <q-form
             class="q-pa-sm"
             @submit="onSendMessage"
            >
            <div 
             class="row"
            >
                <div
                 class="col-11"
                >
                 <q-input 
                    class="full-width"
                    bg-color="white"
                    dense
                    rounded 
                    outlined
                    v-model="message" 
                    label="message" 
                 />
                </div>
                <div
                 class="col-1"
                >
                 <template 
                    >
                    <q-btn 
                    type="submit"
                    round 
                    dense 
                    flat 
                    icon="send" 
                    color="white"
                    />
                    </template>
                </div>

            </div>
            </q-form>

      </q-footer>
  </q-page>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import mixinDetail from 'src/mixin/mixin.js'
export default {
    mixin: [mixinDetail],
    data() {
        return {
            message: '',
        }
    },
    methods: {
        ...mapActions('store', ['getMessgaeFromFirebase', 'getClearMessageFromFirebase', 'getOtherUser']),
        onSendMessage() {
            this.allMessage.push(
                {
                    text: this.message,
                    from: 'me',
                    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
                }
            )
        }
    },
    computed: {
        ...mapState('store', ['allMessage', 'userInfo', 'otherUser', 'users']),
    },
    created() {
        
        this.getOtherUser(this.$route.params.otheruserid)
        this.getMessgaeFromFirebase(this.$route.params.otheruserid)
        console.log(this.otherUser, 'other userrrrrrrr')
        // console.log(this.onChatUser)
    },
    destroyed() {
        this.getClearMessageFromFirebase()
    }
}
</script>

<style>

</style>