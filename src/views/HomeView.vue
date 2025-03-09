<template>
  <div>
    <h1 class="text-h4 mb-4">
      Blog Posts
    </h1>

    <v-alert
      v-if="posts.length === 0"
      type="info"
    >
      No blog posts available. Create your first post!
    </v-alert>

    <v-row>
      <v-col
        v-for="post in posts"
        :key="post.id"
        cols="12"
      >
        <v-card class="mb-4">
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-subtitle>
            By {{ post.author }} on {{ formatDate(post.date) }}
          </v-card-subtitle>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :to="'/edit/' + post.id"
              text
            >
              Edit
            </v-btn>
            <v-btn
              color="error"
              text
              @click="deletePost(post.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters({
      posts: 'getAllPosts'
    })
  },
  methods: {
    ...mapActions({
      removePost: 'removePost'
    }),
    deletePost(id) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.removePost(id)
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  }
}
</script>
