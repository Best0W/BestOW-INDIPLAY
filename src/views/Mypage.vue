<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row class="mr-3" justify="end">
          <v-dialog v-model="dialog" max-width="800">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">Edit ProFile</v-btn>
            </template>
            <v-card>
              <v-toolbar flat>
                <v-toolbar-title>User Profile</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon :disabled="!valid" @click="changeName">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-avatar class="ml-5" size="200">
                    <v-img :src="$store.state.user.photoURL"></v-img>
                    </v-avatar>
                    <!-- <br>
                    <p class="mt-3 text-center headline">
                    {{$store.state.user.displayName}}
                    </p> -->
                  </v-col>
                  <v-col cols="8">
                    <v-form v-model="valid">
                      <v-file-input
                        v-model="file"
                        label="Edit Photo"
                        prepend-icon="mdi-camera"
                        @change="upload"
                        outlined
                      ></v-file-input>
                      <v-text-field
                      label="User Name"
                      v-model="userName"
                      :rules="[rule.required, rule.minLength(1), rule.maxLength(15)]"
                      outlined
                    ></v-text-field>
                    </v-form>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
        <v-list-item>
          <v-list-item-avatar size="200">
            <v-img :src="$store.state.user.photoURL"></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="ml-10">
            <p class="display-3">{{$store.state.user.displayName}}</p>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="8">
        <my-tabs></my-tabs>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="6">
            <p class="text-center">Follower</p>
            <p class="text-center">{{follower}}</p>
            </v-col>
          <v-col cols="6">
            <p class="text-center">Following</p>
            <p class="text-center">{{following}}</p>
          </v-col>
        </v-row>
        <br>
        <br>
        <br>
        <p class="text-center">Recently Listend</p>
        <v-card flat tile>
          <v-card-text>
            <p> 최근에 들은 곡 리스트 </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import myTabs from "@/components/tabs.vue";
import { readAndCompressImage } from 'browser-image-resizer'
  export default {
    components: {myTabs},
    data: () => ({
      dialog: false,
      file: null,
      userName: "",
      valid: false,
      rule: {
        required: v => !!v || '필수 항목입니다.',
        minLength: length => v => v.length >= length || `${length}자리 이상으로 입력하세요.`,
        maxLength: length => v => v.length <= length || `${length}자리 이하으로 입력하세요.`
      },
      follower: "",
      following: ""
    }),
    created () {
      this.userName = this.$store.state.user.displayName;
      this.follower = 0;
      this.following = 0;
    },
    methods: {
    async upload () {
      const r = await this.$swal.fire({
        title: 'Change your photo?',
        type: 'warning',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancle',
        showCancelButton: true
      })
      if (!r.value) {
        this.file = null
        return
      }
      const storageRef = this.$firebase.storage().ref()
      const user = this.$firebase.auth().currentUser
      const config = {
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        autoRotate: true
      }
      const resizedImage = await readAndCompressImage(this.file, config)
      const uploadTask = storageRef.child(user.uid).put(resizedImage)
      uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          switch (snapshot.state) {
            case this.$firebase.storage.TaskState.PAUSED:
              this.$toasted.global.error('Upload is paused')
              break
            case this.$firebase.storage.TaskState.RUNNING:
              break
          }
        }, (error) => {
          this.$toasted.global.error(error.code)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (photoURL) => {
            await user.updateProfile({photoURL:photoURL})
            await this.$firebase.firestore().collection('users').doc(user.uid).update({photoURL:photoURL})
            this.dialog = "false"
            location.reload()
          })
        })
    },
    async changeName () {
      const r = await this.$swal.fire({
        title: 'Change your name?',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancle',
        showCancelButton: true
      })
      if (!r.value) return this.userName = ""
      const user = this.$firebase.auth().currentUser
      const displayName = this.userName
      await user.updateProfile({displayName:displayName})
      await this.$firebase.firestore().collection('users').doc(user.uid).update({displayName:displayName})
      this.dialog = false
      await location.reload()
    }
  }
}
</script>