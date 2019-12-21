<template>
    <q-form 
    class="q-gutter-md">
    <q-input
      v-if="tab == 'register'"
      v-model="formdata.name"
      filled
      label="Your name *"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type your name']"
    />
    <q-input
      v-model="formdata.email"
      filled
      label="Your email *"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type your email']"
    />
    <q-input
      v-model="formdata.password"
      filled
      type="password"
      label="Your password *"
      lazy-rules
      :rules="[
                  val => val !== null && val !== '' || 'Please type your password'
              ]"
    />
    <div 
    class="flex cloumn col"
    >
      <q-btn 
      @click="onSubmit"
      class="flex col flex-end" 
      label="Register" 
      color="primary" 
      />
    </div>
    <div 
    class="flex cloumn col"
    >
      <q-btn 
      @click="onSignout"
      class="flex col flex-end q-mt-sm" 
      label="Logout" 
      color="primary" 
      />
    </div>
    
  </q-form>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    props: ['tab'],
    data() {
        return {
            formdata: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    created()  {
        console.log(this.tab, typeof(this.tab), 'tab')
    },
    methods: {
        ...mapActions('store', ['register', 'login', 'signOut']),
        onSubmit() {
            if(this.tab == 'login') {
                this.login(this.formdata)
            } else {
                this.register(this.formdata)
            }
        },
        onSignout() {
            this.signOut()
        }
    }
};
</script>

<style>
</style>