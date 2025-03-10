<template>
  <div>
    <h1 class="text-h4 mb-4">
      Create New Blog Post
    </h1>

    <v-card>
      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent="createPost"
        >
          <v-text-field
            v-model="post.title"
            label="Title"
            required
            :rules="[v => !!v || 'Title is required']"
            aria-label="Post title"
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
import { useBlogStore } from '@/stores/blog'

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
    createPost() {
      if (this.isFormValid) {
        const blogStore = useBlogStore()
        blogStore.createPost(this.post)
        this.$router.push('/')
      }
    }
  }
}
</script>
