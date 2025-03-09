<template>
  <div>
    <h1 class="text-h4 mb-4">
      Edit Blog Post
    </h1>

    <v-alert
      v-if="!post"
      type="error"
    >
      Post not found!
    </v-alert>

    <v-card v-else>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="editedPost.title"
            label="Title"
            required
          />

          <v-text-field
            v-model="editedPost.author"
            label="Author"
            required
          />

          <v-textarea
            v-model="editedPost.content"
            label="Content"
            required
            rows="8"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="secondary"
          to="/"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!isFormValid"
          @click="savePost"
        >
          Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditPostView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editedPost: {
        id: '',
        title: '',
        author: '',
        content: '',
        date: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getPost: 'getPostById'
    }),
    post() {
      return this.getPost(this.id)
    },
    isFormValid() {
      return this.editedPost.title && this.editedPost.author && this.editedPost.content
    }
  },
  created() {
    if (this.post) {
      this.editedPost = { ...this.post }
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions({
      updatePost: 'updatePost'
    }),
    savePost() {
      if (this.isFormValid) {
        this.updatePost(this.editedPost)
        this.$router.push('/')
      }
    }
  }
}
</script>
