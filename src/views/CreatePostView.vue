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

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import type { NewBlogPost } from '@/stores/blog'

export default defineComponent({
  name: 'CreatePostView',
  setup() {
    const router = useRouter()
    const blogStore = useBlogStore()

    const post = ref<NewBlogPost>({
      title: '',
      author: '',
      content: ''
    })

    const isFormValid = computed((): boolean => {
      return !!post.value.title && !!post.value.author && !!post.value.content
    })

    const createPost = (): void => {
      if (isFormValid.value) {
        blogStore.createPost(post.value)
        router.push('/')
      }
    }

    return {
      post,
      isFormValid,
      createPost
    }
  }
})
</script>
