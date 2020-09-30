<template>
  <div class="home">
    
          
                          <v-app-bar
                    color="deep-white accent-4"
                    dense
                    
                  >
                    

                    <v-toolbar-title>Home page</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>

                                        
                  </v-app-bar>


        <v-container>
              <v-row class="text-center">
                <v-col cols="12">
                 
                </v-col>

                <v-col class="mb-4">
                  <h1 class="display-2 font-weight-bold mb-3">
                    Welcome to Slack clone
                  </h1>

                  <p class="subheading font-weight-regular">
                    This slack clone was built with Vue js and Firebase to realtime chat.
                    
                  </p>
                </v-col>

                <v-col
                  class="mb-5"
                  cols="12"
                >
                                  
                </v-col>

              

                
              </v-row>
            </v-container>

          
      
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
    
  }
}
</script>
