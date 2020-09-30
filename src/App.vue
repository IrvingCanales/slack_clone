<template>
  <v-app>
    
    <Sidebar v-if="getLogIn" />
    
    
    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>


import Sidebar from './components/Sidebar'
import {mapGetters} from 'vuex'

export default {
  name: 'App',

  components: {    
    Sidebar
  },
  computed:{
    ...mapGetters(['getLogIn'])
  },

  data: () => ({
    logged: false
    
  }),
};
</script>
