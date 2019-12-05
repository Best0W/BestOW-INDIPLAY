<template>
  <v-container>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          Community
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title> {{title}} </v-card-title>
      <v-divider></v-divider>
        <v-row>
          <v-card-subtitle class="ml-3"> 조회 수 : {{readCount}}</v-card-subtitle>
          <v-card-subtitle> 작성자 : {{writer}}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-subtitle class="mr-5"> 추천 수 : {{like}}</v-card-subtitle>
          <v-btn class="mt-2 mr-6" @click="likeCount">like
            <v-icon small class="ml-1">mdi-thumb-up-outline</v-icon>
          </v-btn>
        </v-row>
      <v-divider></v-divider>
       <v-card-text class="body-1"> {{content}} </v-card-text>
      <v-card-text>
        <v-row class="mr-3" justify="end">
          <v-btn class="mr-2" to="/community">Back
            <v-icon small class="ml-1">mdi-keyboard-return</v-icon>
          </v-btn> 
          <v-btn class="mr-2" @click="edit" v-if="writer===$store.state.user.displayName">Edit
            <v-icon small class="ml-1">mdi-playlist-edit</v-icon>
          </v-btn>
          <v-btn @click="del" v-if="writer===$store.state.user.displayName">Delete
            <v-icon small class="ml-1">mdi-delete-outline</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>    
    </v-card>
    <comments/>
  </v-container>
</template>
<script>
import comments from "./Comment"

export default {
  components: {comments},
  data(){
    return{
      title : "",
      readCount : "",
      writer : "",
      like : "",
      content : "",
      board : this.$firebase.firestore().collection('community'),
      contentId : Number(this.$route.params.contentId)
    }
  },
  async created (){
    this.board.where("contentId", "==", this.contentId).get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        this.title = data.title
        this.readCount = data.readCount + 1,
        this.writer = data.writer,
        this.like = data.like,
        this.content = data.content
      });
    });
    await this.board.where("contentId", "==", this.contentId).get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let Count = this.board.doc(doc.id)
        let data = doc.data()
        Count.update({
          readCount: data.readCount + 1
        })
      });
    });
  },
methods: {
  del(){
    this.board.where("contentId", "==", this.contentId).get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let edit = this.board.doc(doc.id)
        edit.delete()
      });
      this.$router.push({
      path: '/community'
      })
    })
  },
  edit(){
    this.$router.push({
      path: `/edit/${this.contentId}`
    })
  },
  likeCount(){
    this.board.where("contentId", "==", this.contentId).get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let Count = this.board.doc(doc.id)
        let data = doc.data()
        Count.update({
          like: data.like + 1
        })
        this.like++
      });
    });
  }
 }
}

</script>