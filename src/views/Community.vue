<template>
  <v-container fluid>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          Community
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :ref="board"
        :headers="headers"
        :items="items"
        :search="search"
        @click:row="readContent"
      >
      <v-alert slot="no-results" :value="true">
        Your search for "{{ search }}" found no results.
      </v-alert>
      </v-data-table>
      <v-card-text>
        <v-row class="mr-3" justify="end">
          <v-btn v-if="$store.state.user" to="/create"> Write </v-btn>
        </v-row>
      </v-card-text>
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