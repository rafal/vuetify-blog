<template>
  <div>
    <h1 class="text-h4 mb-4">
      Create New Blog Post
    </h1>

    <v-card>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="post.title"
            label="Title"
            required
          />

          <v-text-field
            v-model="post.author"
            label="Author"
            required
          />

          <v-textarea
            v-model="post.content"
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
          @click="createPost"
        >
          Create Post
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreatePostView',
  data() {
    return {
      post: {
        title: '',
        author: '',
        content: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.post.title && this.post.author && this.post.content
    }
  },
  methods: {
    ...mapActions({
      addPost: 'createPost'
    }),
    createPost() {
      if (this.isFormValid) {
        this.addPost(this.post)
        this.$router.push('/')
      }
    }
  }
}
</script>
