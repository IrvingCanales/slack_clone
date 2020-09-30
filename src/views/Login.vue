<template>
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12 text-center">
              <div class="text-center" style="padding:30px">
                
                
                            <v-avatar
                    size="120px"
                    item
                    >
                        <v-img
                            :src="src"
                            alt="Slack"
                        ></v-img>
                        
                    </v-avatar>
               
              </div>
              <v-card-text>
                <h2>Sign in Programmer slack</h2>
                <h4>programmer.slack.com</h4>
              </v-card-text>
              
              <div class="align-center" style="padding:15px">
                    <v-btn color="#0a8d48" @click="sigIn" class="white--text">Sign in with google</v-btn>
                </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import {auth, provider} from '../firebase.js'
import {mapActions} from 'vuex'
export default {
    data: ()=>({
        src: 'https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
    }),

    methods:{
        ...mapActions(['logIn']),
        sigIn(){
            auth.signInWithPopup(provider)
            .then(resp => {                
                
                const user = {
                    name: resp.user.displayName,
                    photo: resp.user.photoURL,
                    email : resp.user.email
                }
                this.logIn(user)
                this.$router.push('/')
            }).catch(e => {
                console.log(e.message)
            })
        }
    }

}
</script>

<style>

</style>