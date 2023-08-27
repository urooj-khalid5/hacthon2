// // Detect changes in user authentication state
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in, fetch and display the user's username
//       fetchUsernameFromDatabase(user.uid).then(function(username) {
//         document.getElementById("nav-user").innerHTML = username;
//       }).catch(function(error) {
//         console.error("Error fetching username:", error);
//         document.getElementById("nav-user").innerHTML = "Guest";
//       });
//     } else {
//       // User is signed out, update the navigation bar accordingly
//       document.getElementById("nav-user").innerHTML = "Guest";
//     }
//   });
  
//   // Function to fetch the user's username from the Realtime Database
//   function fetchUsernameFromDatabase(uid) {
//     return firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {
//       return snapshot.val().username;
//     });
//   }


  // Reference to Firestore collection
  const blogsRef = firebase.firestore().collection('blog-post');

  // Function to publish a blog
  function publishBlog() {
      const title = document.getElementById('blog-title').value;
      const description = document.getElementById('blog-description').value;
  
      // Add the blog to Firestore
      blogsRef.add({
          title: title,
          description: description
      }).then(() => {
          console.log('Blog published successfully.');
          // Clear the form fields
          document.getElementById('blog-title').value = '';
          document.getElementById('blog-description').value = '';
          // Fetch and display blogs
          fetchAndDisplayBlogs();
      }).catch(error => {
          console.error('Error publishing blog:', error);
      });
  }
  
  // Function to fetch and display blogs
  function fetchAndDisplayBlogs() {
      blogsRef.get().then(querySnapshot => {
          const blogsContainer = document.getElementById('blogs-container');
          blogsContainer.innerHTML = ''; // Clear previous content
     // In the fetchAndDisplayBlogs function
  querySnapshot.forEach(doc => {
      const blogData = doc.data();
      const blogElement = document.createElement('div');
      blogElement.classList.add('blog-post');
      blogElement.innerHTML = `
          <h2>${blogData.title}</h2>
          <p>${blogData.description}</p>
      `;
      blogsContainer.appendChild(blogElement);
  });
      }).catch(error => {
          console.error('Error fetching blogs:', error);
      });
  }
  function publishBlog() {
      const title = document.getElementById('blog-title').value;
      const description = document.getElementById('blog-description').value;
  
      // Create a new blog post element
      const blogPost = document.createElement('div');
      blogPost.classList.add('blog-post');
      blogPost.innerHTML = `
          <h2>${title}</h2>
          <p>${description}</p>
      `;
  
      // Append the blog post to the container
      const blogsContainer = document.getElementById('blogs-container');
      blogsContainer.appendChild(blogPost);
  
      // Clear the input fields
      document.getElementById('blog-title').value = '';
      document.getElementById('blog-description').value = '';
  }
  
  // Attach the event listener after DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('publish-button').addEventListener('click', publishBlog);
  });