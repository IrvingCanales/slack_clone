<template>
  <div>
      <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      color="#400d40"
      dark
      app
    >
      <v-list dense>

         

          <h2 class="mt-4 white--text  text--darken-1">Programmers</h2>
          

          <v-list-item >
          
            <v-list-item-action>
              <v-icon  color="green darken-2">mdi-checkbox-blank-circle</v-icon>
              
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text">
                {{getUserInfo.name}}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon> <v-icon class="white--text">mdi-pencil-box</v-icon> </v-btn>
            </v-list-item-action>

          </v-list-item>
        
        <v-divider></v-divider>
          

        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            class="white--text"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 white--text"
              >EDIT</a>
            </v-col>
          </v-row>

        



          <v-list-item
            v-else
            :key="item.text"
            link
            class="white--text"
          >

          
            <v-list-item-action  style="margin-right:5px">
              <v-icon class="white--text ">{{item.icon}}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text ">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>

        <v-divider ></v-divider>

        <v-subheader class="mt-4 white--text " ><v-icon class="white--text">mdi-chevron-down</v-icon>  Channels</v-subheader>

        <v-divider ></v-divider>

        
        <v-list-item link @click="addNewChannel" >
        <v-list-item-action   style="margin-right:5px"  >
              <v-icon class="white--text">mdi-plus</v-icon> 
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text ">
                Add Channel
              </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

          <template v-for="doc in docs">

          <v-list-item
            :to="'/room/'+doc.id"
            :key="doc.id"
            link
            class="white--text"
          >

          
            <v-list-item-action  style="margin-right:5px">
              <v-icon class="white--text ">mdi-pound</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text ">
                {{ doc.name }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>

      </v-list>

      

    </v-navigation-drawer>




    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#2b092b"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn
        icon
        large
      >
        <v-avatar
          size="50px"
          item
        >
            <v-img
                :src="getUserInfo.photo"
                alt="Vuetify"
            ></v-img>
            
        </v-avatar>
      </v-btn>

      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        
      </v-toolbar-title>

      <v-btn icon>
        <v-icon > mdi-clock </v-icon>
      </v-btn>

      
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      
      <v-btn icon>
        <v-icon>mdi-help</v-icon>
      </v-btn>

      
    </v-app-bar>
  </div>
</template>

<script>
import db from '../firebase.js'
import firebase from 'firebase'
import {mapGetters} from 'vuex'

export default {
    name:'Sidebar',
    data: ()=> ({
        drawer: null,
        items: [
        { icon: 'mdi-message-text', text: 'Threads' },
        { icon: 'mdi-at', text: 'Mentions & reactions' },        
        { icon: 'mdi-bookmark-outline', text: 'Saved items' },        
        { icon: 'mdi-file-find', text: 'Channel Browser' },        
        { icon: 'mdi-account-multiple', text: 'People & user groups' },        
        { icon: 'mdi-apps', text: 'Apps' },        
        { icon: 'mdi-image-filter-none', text: 'File Browser' },        
                
       ],
       docs:[]
    }),
    methods:{
        addNewChannel(){
            const newChannel = prompt("Name of new channel?")

            if(newChannel){
                db.collection('rooms').add({
                    name: newChannel
                })
            }
        }
    },
    computed:{
        ...mapGetters(['getUserInfo'])
    },

    mounted(){
        db.collection('rooms').onSnapshot(snapshot => {
            this.docs=[]
            snapshot.docs.map(doc => {
                this.docs.push({id:doc.id, name:doc.data().name })
                
            })
        })
    }

    
}
</script>

<style>

</style>