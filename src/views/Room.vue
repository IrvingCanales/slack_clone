<template>
  <div>      

           <v-app-bar
                    color="deep-white accent-4"
                    dense
                    
                  >
                    

                    <v-toolbar-title> <v-icon>mdi-pound</v-icon> {{ roomsDetails.name }} </v-toolbar-title>

                    <v-btn icon>
                      <v-icon>mdi-star-outline</v-icon>
                    </v-btn>
                    

                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>mdi-information-outline</v-icon>
                    </v-btn>
                    Details

                    

                    

                  </v-app-bar>

            <v-container class=" Messages " v-chat-scroll>
                <template v-for="messages in setMessages" >
                    <v-row
                        
                        :key="messages.timestamp.seconds"
                        class="black--text"
                        align="center"
                    >
                        <v-col cols="12">
                             <v-card                                                            
                                
                            >
                            <v-list-item three-line>
                                <v-list-item-avatar
                                size="50px"
                                item
                                >
                                    <v-img
                                        :src="messages.userimage"
                                        alt="Avatar"
                                    ></v-img>
                                    
                                    
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <div> <strong>{{messages.user}} </strong> <span style="color:gray; font-size:12px"> {{messages.timestamp.toDate()}}</span> </div>

                                    <v-list-item-subtitle v-show="messages.image" style="font-size:20px;color:black">
                                        <v-img  :src="messages.image" />

                                    </v-list-item-subtitle>
                                    
                                    <v-list-item-subtitle style="font-size:20px;color:black">{{messages.message}}</v-list-item-subtitle>
                                    
                                </v-list-item-content>

                                

                           
                                
                            </v-list-item>
                            
                            </v-card>
                            


                        </v-col>
                    </v-row>
                </template>

                <div class="footer">
                    <v-footer >
                    <v-col cols="12">
                        <v-text-field
                            append-icon="mdi-paperclip"
                            filled
                            clear-icon="mdi-close-circle"
                            clearable
                            label="Message"
                            type="text"
                            v-model="message"
                            v-on:keyup.enter="sendMessage"
                            @click:append="click1"
                        ></v-text-field>                        

           <input type="file" ref="input1"
            style="display: none"
            @change="previewPhoto"
             accept="image/*" > 

                        <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*">

                
                    </v-col>
            </v-footer>
                </div>

            </v-container>

            
            
            
  </div>
</template>

<script>
import db, {storage} from '../firebase.js'
import firebase from 'firebase'
import {mapGetters} from 'vuex'
export default {
    data: ()=>({
        room:'',
        roomsDetails:{},
        setRoomDetails:'',
        setMessages:[],
        message:'',
        image: null,
        imageURL: '',
    }),
    watch: {
        // call again the method if the route changes
        '$route': 'getInfo'
    },    
    computed:{
        ...mapGetters(['getUserInfo'])
    },
    methods:{
        async getInfo(){
                
                    
                    let id = this.$route.params.id
                    this.setMessages = []
                    this.roomsDetails = {}
                    

                    db.collection('rooms').doc(id).onSnapshot(snapshot=>{
                    
                        this.roomsDetails=snapshot.data();
                        
                    })

                   await db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','asc')
                    .onSnapshot(snapshot => {
                            this.setMessages = []
                            snapshot.docs.map(doc => {

                                this.setMessages.push({timestamp:doc.data().timestamp , user: doc.data().user, message: doc.data().message, userimage:doc.data().userImage, image: doc.data().image})
                                
                            })
                    })

                    
                
            
        },
        click1() {
            this.$refs.input1.click()   
            
        },
        previewPhoto(event){
            this.image = event.target.files[0];

            //DataImage
            if(this.image){

                storage.child(`${this.image.name}`).put(this.image)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    
                    this.imageURL = url
                    this.sendMessage()
                })
                .catch(e => {
                    console.log(e)
                })
                                
            }

            
            
        },
        sendMessage(){

            let id = this.$route.params.id
            

            

            db.collection('rooms').doc(id).collection("messages").add({                
                message: this.message,
                timestamp: new Date,
                user: this.getUserInfo.name,
                userImage: this.getUserInfo.photo,
                image: this.imageURL
            })

            this.message=''
            this.urlImage=''
            this.imageURL = ''

            



        }

    },
    mounted(){
      this.getInfo();  
    }

}
</script>

<style>
.Messages{
    max-height: 750px
}

.footer{
    
    position: relative;
}

@media (max-width: 990px) {
    .Messages{
        max-height: 650px
    }
}
</style>