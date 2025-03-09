import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: JSON.parse(localStorage.getItem('blog-posts') || '[]')
  },
  getters: {
    getAllPosts(state) {
      return state.posts
    },
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === id)
    }
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post)
      localStorage.setItem('blog-posts', JSON.stringify(state.posts))
    },
    updatePost(state, updatedPost) {
      const index = state.posts.findIndex(post => post.id === updatedPost.id)
      if (index !== -1) {
        state.posts.splice(index, 1, updatedPost)
        localStorage.setItem('blog-posts', JSON.stringify(state.posts))
      }
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId)
      localStorage.setItem('blog-posts', JSON.stringify(state.posts))
    }
  },
  actions: {
    createPost({ commit }, post) {
      post.id = Date.now().toString()
      post.date = new Date().toISOString()
      commit('addPost', post)
    },
    updatePost({ commit }, post) {
      commit('updatePost', post)
    },
    removePost({ commit }, postId) {
      commit('deletePost', postId)
    }
  }
})
