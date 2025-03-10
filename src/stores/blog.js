import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: JSON.parse(localStorage.getItem('blog-posts') || '[]')
  }),

  getters: {
    getAllPosts: (state) => state.posts,
    getPostById: (state) => (id) => state.posts.find(post => post.id === id)
  },

  actions: {
    createPost(post) {
      const newPost = {
        ...post,
        id: Date.now().toString(),
        date: new Date().toISOString()
      }
      this.posts.push(newPost)
      localStorage.setItem('blog-posts', JSON.stringify(this.posts))
    },

    updatePost(updatedPost) {
      const index = this.posts.findIndex(post => post.id === updatedPost.id)
      if (index !== -1) {
        this.posts[index] = updatedPost
        localStorage.setItem('blog-posts', JSON.stringify(this.posts))
      }
    },

    removePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
      localStorage.setItem('blog-posts', JSON.stringify(this.posts))
    }
  }
})
