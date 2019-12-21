<template>
  <q-page>
    <q-list
     class="q-mt-sm"
    >
      <q-item 
        to="/Chat"
        v-for="user in users" 
        :key="user.id" 
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
const users = [
  {
    id: 1,
    name: "Ruddy Jedrzej",
    online: true
  },
  {
    id: 2,
    name: "Mallorie Alessandrini",
    online: true
  },
  {
    id: 3,
    name: "Elisabetta Wicklen",
    online: false
  },
  {
    id: 4,
    name: "Seka Fawdrey",
    online: true
  }
];

export default {
  data() {
    return {
      users,
      message: ''
    };
  }
};
</script>

<style>
</style>