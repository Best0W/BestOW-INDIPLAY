<template>
  <v-container fluid>
    <v-card class="mt-12">
      <v-toolbar>
        <v-toolbar-title>
          Comment
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div v-if="comments == '' ">
          No Comments yet.
          Comment on this post.
        </div>
        <div class="mt-5" v-for="(comment,index) in comments" :key="index">
          <v-avatar size="35"><v-img :src="$store.state.user.photoURL"></v-img></v-avatar>
          {{$store.state.user.displayName}}
          {{comment.commentMessage}}
          <v-icon class="float-right" small @click="delCom(comment,index)">mdi-close</v-icon></div>
      </v-card-text>
    </v-card>
    <v-card class="mt-12">
      <v-toolbar>
        <v-toolbar-title>
          Write Comment
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-textarea
          v-model="message"
          solo
          label="내용을 입력하세요."
          outlined
          rows="8"
        ></v-textarea>
        <v-row class="mr-3" justify="end">
          <v-btn @click="writeComment"> Done </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import data from "@/data"

export default {
  data(){
    return{
      data:data,
      message:"",
      comments:[]
    }
  },
  methods:{
    writeComment(){
      this.comments.push({
        commentMessage: this.message
      });
      this.message = ""
    },
    delCom(comment,index){
      this.comments.splice(index, 1)
    }
  }
}
</script>