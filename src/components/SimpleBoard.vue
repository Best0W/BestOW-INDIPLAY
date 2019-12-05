<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :ref="board"
        :headers="headers"
        :items="items"
        @click:row="readContent"
        items-per-page="5"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        { text: '작성일', value: 'writeDate', sortable: false},
        { text: '추천수', value: 'like' },
        { text: '글제목', value: 'title', sortable: false },
        { text: '작성자', value: 'writer', sortable: false },
        { text: '조회수', value: 'readCount' },
      ],
      items: [],
      board : this.$firebase.firestore().collection('community').orderBy("orderDate", "desc"),
      contentId: ""
    }
  },
  created () {
    this.board.onSnapshot((querySnapshot) => {
      // this.items = [];
      querySnapshot.forEach((doc) => {
        this.items.push({
          contentId: doc.data().contentId,
          writeDate: doc.data().writeDate,
          like: doc.data().like,
          title: doc.data().title,
          writer: doc.data().writer,
          readCount: doc.data().readCount
        });
      });
    });
  },
  methods: {
  readContent(item) {
    if(this.$store.state.user == null){
      alert("Sign in INDIPLAY")
    }else{
      this.$router.push({
        path: `/detail/${item.contentId}`
        })
      }
    }
  }
}
</script>