<template>
  <q-page
   ref="pageChat"
   class="q-page flex column"
  >
      <q-banner 
       dense 
       inline-actions 
       class="text-white bg-grey text-center fixed full-width"
      >
          {{data.name}} is {{data.online ? 'online' : 'offline'}}
      </q-banner>
      <div 
       class="q-pa-md column col justify-end"
      >
        <q-chat-message
            :class="{ 'invisible' : onShowMessage }"
            v-for="(message, index) in allMessage"
            :key="index"
            :name="message.from == 'me' ? userInfo.name : data.name"
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
                    ref="newMessage"
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

export default {
    data() {
        return {
            message: '',
            data : {},
            onShowMessage: true
        }
    },
    methods: {
        ...mapActions('store', ['getMessgaeFromFirebase', 'getClearMessageFromFirebase', 'getOtherUser', 'onSendMessagetoFirebase']),
        onSendMessage() {
            this.onSendMessagetoFirebase({
                message: {
                    text: this.message,
                    from: 'me'
                    },
                onChatUserId: this.$route.params.otheruserid
            })
            this.message = ''
            this.$refs.newMessage.focus()
        },
        scrollToBottom() {
            let pageChat = this.$refs.pageChat.$el
            setTimeout(() => {
                window.scrollTo(0, pageChat.scrollHeight)
            }, 20)
            this.onShowMessage = false
        }
    },
     computed: {
        ...mapState('store', ['allMessage', 'userInfo', 'otherUser', 'users']),
    },
    created() {
        this.getOtherUser(this.$route.params.otheruserid)
        this.getMessgaeFromFirebase(this.$route.params.otheruserid)
        if(this.users[this.$route.params.otheruserid]) {
            return this.data = this.users[this.$route.params.otheruserid]
        }
        console.log(this.data, 'dataaaa')
    },
    watch: {
        allMessage: function (val)  {
            if(Object.keys(val).length) {
                return this.scrollToBottom()
            }
        }
    },
    destroyed() {
        this.getClearMessageFromFirebase()
    }
}
</script>

<style lang="scss" scoped>
.q-page {
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background:
    radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0,
    radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) 50px 50px,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 50px 0,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 50px,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 50px 0,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 100px 50px,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 50px 50px,
    linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0,
    linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0;
    background-color: #300;
    background-size: 100px 100px;
}
.q-banner {
    top: 50px;
    z-index: 2;
    opacity: 0.8;
}
.q-message {
    z-index: 1
}
</style>