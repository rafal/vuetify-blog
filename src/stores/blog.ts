import { defineStore } from 'pinia'

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
}

export interface NewBlogPost {
  title: string;
  author: string;
  content: string;
}

interface BlogState {
  posts: BlogPost[];
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    posts: JSON.parse(localStorage.getItem('blog-posts') || '[]')
  }),

  getters: {
    getAllPosts: (state): BlogPost[] => state.posts,
    getPostById: (state) => (id: string): BlogPost | undefined =>
      state.posts.find(post => post.id === id)
  },

  actions: {
    createPost(post: NewBlogPost): void {
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        date: new Date().toISOString()
      }
      this.posts.push(newPost)
      localStorage.setItem('blog-posts', JSON.stringify(this.posts))
    },

    updatePost(updatedPost: BlogPost): void {
      const index = this.posts.findIndex(post => post.id === updatedPost.id)
      if (index !== -1) {
        this.posts[index] = updatedPost
        localStorage.setItem('blog-posts', JSON.stringify(this.posts))
      }
    },

    removePost(postId: string): void {
      this.posts = this.posts.filter(post => post.id !== postId)
      localStorage.setItem('blog-posts', JSON.stringify(this.posts))
    }
  }
})
