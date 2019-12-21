<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="text-h6 text-center q-pa-md">Login</div>
          <q-form
            @submit="onLogin"
            @reset="onResetLogin"
            class="q-gutter-md"
          >
            <q-input
              filled
              label="Your name *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type your name']"
            />
            <q-input
              filled
              type="email"
              label="Your email *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please type your email',
                val => val > 0 && val < 100 || 'Please type a real email'
              ]"
            />
            <div class="flex cloumn col">
              <q-btn 
                class="flex col flex-end" 
                label="Login" 
                type="submit" 
                color="primary"
              />
            </div>
          </q-form>

          </q-tab-panel>

          <q-tab-panel name="register">
              <div class="text-h6 text-center q-pa-md">Register</div>
            <q-form
            @submit="onRegister"
            @reset="onResetRegister"
            class="q-gutter-md"
            >
              <q-input
                filled
                label="Your name *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your name']"
              />
              <q-input
                filled
                type="email"
                label="Your email *"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Please type your email',
                  val => val > 0 && val < 100 || 'Please type a real email'
                ]"
              />
              <div class="flex cloumn col">
                <q-btn 
                  class="flex col flex-end" 
                  label="Register" 
                  type="submit" 
                  color="primary"
                />
              </div>
            </q-form>
          </q-tab-panel>
          
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
      data() {
        return {
          tab: 'login'
        }
      },
      methods: {
        onLogin() {

        },
        onResetLogin() {
          
        },
        onRegister() {

        },
        onResetRegister() {

        }
      }
}
</script>

<style>

</style>