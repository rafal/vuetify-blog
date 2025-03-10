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
        <v-form
          ref="form"
          @submit.prevent="savePost"
        >
          <v-text-field
            v-model="post.title"
            label="Title"
            required
            :rules="[v => !!v || 'Title is required']"
            aria-label="Post title"
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
import { useBlogStore } from '@/stores/blog'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'EditPostView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const blogStore = useBlogStore()
    const router = useRouter()

    const post = computed(() => blogStore.getPostById(props.id))

    // Create a reactive copy of the post
    const editedPost = reactive({
      id: '',
      title: '',
      author: '',
      content: '',
      date: ''
    })

    // Populate the form with post data if it exists
    if (post.value) {
      Object.assign(editedPost, post.value)
    } else {
      // Redirect if post not found
      router.push('/')
    }

    const isFormValid = computed(() => {
      return editedPost.title && editedPost.author && editedPost.content
    })

    const savePost = () => {
      if (isFormValid.value) {
        blogStore.updatePost(editedPost)
        router.push('/')
      }
    }

    return {
      editedPost,
      post,
      isFormValid,
      savePost
    }
  }
}
</script>
