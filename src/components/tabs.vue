<template v-slot:extension>
  <v-tabs
    background-color="transparent"
    color="black"
    dark
  >
    <v-tabs-slider color="black"></v-tabs-slider>
    <v-tab>
      <v-icon left>mdi-music</v-icon>
      Tracks
    </v-tab>
    <v-tab>
      <v-icon left>mdi-heart-circle-outline</v-icon>
      Like
    </v-tab>
    <v-tab>
      <v-icon left>mdi-account-group</v-icon>
      Following
    </v-tab>
    <v-tab-item>
      <v-card flat tile color="transparent">
        <v-card-text>
          <p>
           나의 곡 리스트
          </p>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat tile>
        <v-card-text>
         <p> 내가 좋아요 한 곡 리스트 </p>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat tile>
        <v-card-text>
          <p>
            내가 팔로잉 한 사람들의 곡 리스트
          </p>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    },
  }
</script>

