<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      
    >
      <v-toolbar flat>
        <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-toolbar-items class="ml-3">
            <v-btn text @click="Home()">Home</v-btn>
            <v-btn text router :to="{name: 'stream'}">Stream</v-btn>
            <v-btn text @click="Upload()">Upload</v-btn>
          </v-toolbar-items>
            <v-row
              class="pl-5"
              style="max-width: 650px"
            >
          <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search"
            single-line
            append-icon="mdi-magnify"
            color="white"
            hide-details
          ></v-text-field>
        </v-row>
          <v-toolbar-items class="ml-5">
            <v-btn text router :to="{name: 'calendar'}">Calendar</v-btn>
            <v-btn text router :to="{name: 'community'}">Community</v-btn>
            <v-btn v-if="$store.state.user && $store.state.claims.level===0" text router :to="{name: 'users'}">Admin</v-btn>
          </v-toolbar-items>
        </template>
          <v-spacer></v-spacer>
          <sign-in v-if="$store.state.user == null"></sign-in>
        <v-toolbar-items v-if="$store.state.user">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                color="transparent"
                depressed
              >
                <v-avatar size="35">
                  <img :src="$store.state.user.photoURL" alt="avatar">
                </v-avatar> 
                  <span>{{ $store.state.user.displayName }}</span>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
              <v-btn color="transparent" depressed router :to="{name: 'mypage'}">
                <v-icon>mdi-account</v-icon> My Page
              </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn color="transparent" depressed>
                <v-icon>mdi-headset</v-icon> Follow
              </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn color="transparent" depressed>
                  <v-icon>mdi-heart-circle-outline</v-icon> Like
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn color="transparent" depressed @click="Theme">
                  <v-icon>mdi-theme-light-dark</v-icon> Theme
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn color="transparent" depressed @click="signOut">
                  <v-icon>mdi-logout</v-icon> Sign Out
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2019 Finger Snap</span>
    </v-footer>
  </v-app>
</template>

<script>
// import signIn from '@/views/Login.vue';
  import SignIn from '@/components/auth/signIn'
  
  export default {
    props: {
      source: String,
    },
    data () {
      return{
        env: process.env.NODE_ENV,
        dialog: false,
      }
    },
    created () {
      this.$vuetify.theme.dark = true;
      // if(this.$route.path === '/') {
      //   this.$router.push({ path: '/home' });
      // }
    },
    components:{
      SignIn
    },
    methods:{
      async signOut () {
        await this.$firebase.auth().signOut();
        this.$router.push('/');
      },
      Theme() {
        if(this.$vuetify.theme.dark == true){
          this.$vuetify.theme.dark = false;
        }else{
          this.$vuetify.theme.dark = true;
        }
      },
      Home() {
        if(this.$route.path != '/'){
          this.$router.push('/');
        }
      },
      Upload() {
        if(this.$store.state.user == null){
         alert('Sign in INDIPLAY')
        }else{
          this.$router.push('/upload');
        }
      }
    }
  }
</script>