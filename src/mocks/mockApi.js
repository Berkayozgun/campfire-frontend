const mockPosts = [
  {
    _id: '1',
    title: 'Welcome to Campfire!',
    content: 'This is a mock post. Enjoy the demo! Feel free to create your own posts and interact with others. We are building a vibrant community here!',
    author: { username: 'demoUser' },
    date: '2024-06-01',
    upvotes: 15,
    downvotes: 3,
    votes: 12,
    comments: [
      { comment_id: 'c1', user: 'demoUser', comment: 'Nice post!' },
      { comment_id: 'c2', user: 'mockUser', comment: 'Agreed, very insightful.' }
    ],
  },
  {
    _id: '2',
    title: 'Exploring Vue.js 3 Features',
    content: 'Vue.js 3 brings exciting new features like the Composition API, Teleport, and Fragments. These additions significantly improve developer experience and performance. Dive in and explore!',
    author: { username: 'vueDev' },
    date: '2024-05-28',
    upvotes: 25,
    downvotes: 2,
    votes: 23,
    comments: [
      { comment_id: 'c3', user: 'anotherDev', comment: 'Composition API is a game-changer!' },
      { comment_id: 'c4', user: 'vueDev', comment: 'Absolutely! It makes complex components much more manageable.' }
    ],
  },
  {
    _id: '3',
    title: 'The Future of Web Development',
    content: 'Web development is constantly evolving. With the rise of WebAssembly, AI in the browser, and advanced CSS features, the possibilities are endless. What are you most excited about?',
    author: { username: 'webInnovator' },
    date: '2024-05-25',
    upvotes: 30,
    downvotes: 5,
    votes: 25,
    comments: [
      { comment_id: 'c5', user: 'aiEnthusiast', comment: 'AI in the browser is fascinating!' },
      { comment_id: 'c6', user: 'cssLover', comment: 'CSS advancements are often overlooked but so powerful.' }
    ],
  },
  {
    _id: '4',
    title: 'Tips for Optimizing Vue Performance',
    content: 'To ensure your Vue applications are fast and responsive, consider lazy loading components, optimizing image assets, and using `v-once` for static content. Small changes can make a big difference!',
    author: { username: 'perfGuru' },
    date: '2024-05-20',
    upvotes: 18,
    downvotes: 1,
    votes: 17,
    comments: [
      { comment_id: 'c7', user: 'newbieDev', comment: 'Great tips! I always struggle with performance.' }
    ],
  },
  {
    _id: '5',
    title: 'Building Accessible Web Applications',
    content: 'Accessibility is crucial for inclusive web experiences. Remember to use semantic HTML, provide alt text for images, and ensure keyboard navigation. Make the web usable for everyone!',
    author: { username: 'a11yChampion' },
    date: '2024-05-18',
    upvotes: 40,
    downvotes: 0,
    votes: 40,
    comments: [
      { comment_id: 'c8', user: 'userExperience', comment: 'Accessibility should be a priority from day one.' }
    ],
  },
  {
    _id: '6',
    title: 'Understanding State Management in Vuex',
    content: 'Vuex provides a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. Mastering Vuex is key for large-scale Vue apps.',
    author: { username: 'stateMaster' },
    date: '2024-05-15',
    upvotes: 22,
    downvotes: 4,
    votes: 18,
    comments: [
      { comment_id: 'c9', user: 'juniorDev', comment: 'Vuex still confuses me sometimes.' }
    ],
  },
  {
    _id: '7',
    title: 'CSS Grid vs. Flexbox: When to Use Which?',
    content: 'Both CSS Grid and Flexbox are powerful layout modules. Flexbox is ideal for one-dimensional layouts (rows or columns), while Grid excels at two-dimensional layouts. Choose wisely for optimal results!',
    author: { username: 'layoutExpert' },
    date: '2024-05-12',
    upvotes: 35,
    downvotes: 3,
    votes: 32,
    comments: [
      { comment_id: 'c10', user: 'designFan', comment: 'This is a classic debate!' }
    ],
  },
  {
    _id: '8',
    title: 'The Importance of Code Reviews',
    content: 'Code reviews are not just about finding bugs; they are about sharing knowledge, improving code quality, and fostering a collaborative team environment. Embrace them!',
    author: { username: 'teamLead' },
    date: '2024-05-10',
    upvotes: 28,
    downvotes: 1,
    votes: 27,
    comments: [
      { comment_id: 'c11', user: 'soloDev', comment: 'I miss code reviews in my current role.' }
    ],
  },
  {
    _id: '9',
    title: 'Getting Started with Nuxt.js',
    content: 'Nuxt.js is a powerful framework for building universal Vue.js applications. It simplifies server-side rendering, static site generation, and more. A great choice for your next project!',
    author: { username: 'nuxtFan' },
    date: '2024-05-08',
    upvotes: 19,
    downvotes: 0,
    votes: 19,
    comments: [
      { comment_id: 'c12', user: 'ssrCurious', comment: 'SSR is definitely something I want to explore.' }
    ],
  },
  {
    _id: '10',
    title: 'Best Practices for API Design',
    content: 'Designing robust and intuitive APIs is crucial for scalable applications. Focus on clear naming conventions, consistent error handling, and proper versioning. Your consumers will thank you!',
    author: { username: 'apiArchitect' },
    date: '2024-05-05',
    upvotes: 33,
    downvotes: 2,
    votes: 31,
    comments: [
      { comment_id: 'c13', user: 'backendDev', comment: 'Error handling is often overlooked!' }
    ],
  },
];

let mockUsers = [
  { username: 'demoUser', password: 'demo', access_token: 'mocktoken1' },
];

export function mockLogin({ username, password }) {
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user) {
    return Promise.resolve({ username: user.username, access_token: user.access_token });
  } else {
    return Promise.reject(new Error('Invalid credentials'));
  }
}

export function mockRegister(userData) {
  if (mockUsers.some(u => u.username === userData.username)) {
    return Promise.reject(new Error('Username already exists'));
  }
  const newUser = { ...userData, access_token: 'mocktoken' + (mockUsers.length + 1) };
  mockUsers.push(newUser);
  return Promise.resolve({ username: newUser.username, access_token: newUser.access_token });
}

export function mockGetPosts() {
  return Promise.resolve({ posts: mockPosts });
}

export function mockCreatePost({ title, content, author }) {
  const newPost = {
    _id: (mockPosts.length + 1).toString(),
    title,
    content,
    author: { username: author },
    date: new Date().toISOString().split('T')[0],
    upvotes: 0,
    downvotes: 0,
    votes: 0,
    comments: [],
  };
  mockPosts.unshift(newPost);
  return Promise.resolve({ post: newPost });
}

export function mockVote({ postId, voteType }) {
  const post = mockPosts.find(p => p._id === postId);
  if (!post) return Promise.reject(new Error('Post not found'));
  if (voteType === 'upvote') {
    post.upvotes += 1;
    post.votes += 1;
  } else if (voteType === 'downvote') {
    post.downvotes += 1;
    post.votes -= 1;
  }
  return Promise.resolve({ success: true });
}

export function mockAddComment({ postId, user, comment }) {
  const post = mockPosts.find(p => p._id === postId);
  if (!post) return Promise.reject(new Error('Post not found'));
  const newComment = { comment_id: 'c' + (post.comments.length + 1), user, comment };
  post.comments.push(newComment);
  return Promise.resolve({ comment_id: newComment.comment_id });
}

export function mockLogout() {
  return Promise.resolve({ success: true });
} 