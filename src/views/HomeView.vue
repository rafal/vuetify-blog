<template>
  <div>
    <h1 class="text-h4 mb-4">
      Blog Posts
    </h1>

    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      label="Search posts"
      clearable
      single-line
      hide-details
      class="mb-4"
    />

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
              aria-label="Edit post"
            >
              <v-icon>mdi-pencil</v-icon>
              <span class="ms-1">Edit</span>
            </v-btn>
            <v-btn
              color="error"
              text
              aria-label="Delete post"
              @click="deletePost(post.id)"
            >
              <v-icon>mdi-delete</v-icon>
              <span class="ms-1">Delete</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useBlogStore } from '@/stores/blog'

interface BlogPost {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
}

export default defineComponent({
  name: 'HomeView',
  setup() {
    const blogStore = useBlogStore()
    const searchQuery = ref('')

    const allPosts = computed((): BlogPost[] => blogStore.getAllPosts)
    const posts = computed((): BlogPost[] => {
      if (!searchQuery.value) return allPosts.value

      const query = searchQuery.value.toLowerCase()
      return allPosts.value.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      )
    })

    const deletePost = (id: string): void => {
      if (confirm('Are you sure you want to delete this post?')) {
        blogStore.removePost(id)
      }
    }

    const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return {
      searchQuery,
      posts,
      deletePost,
      formatDate
    }
  }
})
</script>
