<template>
  <v-container fluid>
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Community</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <p class="title">Title</p>
        <v-text-field
          v-model="contentTitle"
          label="제목을 입력하세요."
          outlined
          dense
        ></v-text-field>
        <p class="title">Content</p>
        <v-textarea
          v-model="content"
          solo
          label="내용을 입력하세요."
          outlined
          rows="20"
        ></v-textarea>
      </v-card-text>
      <v-card-text>
        <v-row class="mr-3" justify="end">
          <v-btn class="mr-2" to="/community">Cancle</v-btn>
          <v-btn @click= write()>Done</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return{
      contentId:"",
      contentTitle:"",
      content: "",
      like: 0,
      readCount: 0,
    }
  },
  methods: {
    write() {
      if(this.contentTitle == "" || this.content == ""){
        alert("글의 제목과 내용을 모두 입력해주세요.")
        return false;
      }
      //today 날짜 표시
      let date = new Date()
      let year = date.getFullYear();
      let month = date.getMonth()+1
      let day = date.getDate();
      if(month < 10){
        month = "0"+month;
      }
      if(day < 10){
          day = "0"+day;
      }
      let today = year+"-"+month+"-"+day;
      
      this.$firebase.firestore().collection('community').add({
        contentId: Math.random(),
        orderDate: date,
        writeDate: today,
        like: this.like,
        title: this.contentTitle,
        writer: this.$store.state.user.displayName,
        readCount: this.readCount,
        content: this.content,
      })
      this.$router.push({
        path: '/community'
      })
    },
  }
}
</script>