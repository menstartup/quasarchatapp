<template>
  <q-page>
    <q-list
     class="q-mt-sm"
    >
      <q-item 
        v-for="(user, key) in getUsers" 
        :to="'/Chat/'+key"
        :key="key" 
        clickable 
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">{{ user.name.charAt(0) }}</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-badge 
             class="q-pa-sm"
             :color="user.online ? 'blue' : 'teal'"
            >
                {{user.online ? 'online' : 'offline'}}
            </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
    
  </q-page>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      message: '',
    };
  },
  created() {
  },
  computed: {
    // ...map
    ...mapState('store', ['users']),
    ...mapGetters('store', ['getUsers']),
  },
  methods: {
    
  }
};
</script>

<style>
</style>