<template>
  <q-page
   class="flex column"
  >
      <div 
       class="q-pa-md column col justify-end"
      >
        <q-chat-message
            v-for="(message, index) in conversations"
            :key="index"
            :name="message.from == 'me' ? 'me' : 'Lucy'"
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
export default {
    data() {
        return {
            message: '',
            conversations: [
                {
                    text: 'hey, how are you?',
                    from: 'me',
                    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
                },
                {
                    text: [
                           'doing fine, how r you?',
                           'I just feel like typing a really, really, REALY long message to annoy you...'
                          ],
                    from: 'them',
                    avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
                },
                {
                    text: 'Did it work?',
                    from: 'me',
                    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
                },
            ]
        }
    },
    methods: {
        onSendMessage() {
            this.conversations.push(
                {
                    text: this.message,
                    from: 'me',
                    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
                }
            )
        }
    }
}
</script>

<style>

</style>