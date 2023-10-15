document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addForm');
    const allPosts = document.getElementById('allPosts');
    const getPostForm = document.getElementById('getPostForm');
    const singlePost = document.getElementById('singlePost');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');

    // Function to fetch and display all posts
    const fetchAllPosts = () => {
        fetch('/posts')
            .then(response => response.json())
            .then(data => {
                allPosts.innerHTML = '';
                data.forEach(post => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${post.id}, Content: ${post.content}`;
                    allPosts.appendChild(li);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    fetchAllPosts();

    // Add a new post
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('content').value;

        fetch('/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Add response:', data);
                fetchAllPosts(); // Refresh the list of posts
            })
            .catch(error => console.error('Error:', error));
    });

    // Get a post by ID
    getPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = document.getElementById('postId').value;

        fetch(`/posts/${postId}`)
            .then(response => response.json())
            .then(data => {
                singlePost.textContent = `ID: ${data.id}, Content: ${data.content}`;
            })
            .catch(error => console.error('Error:', error));
    });

    // Update a post by ID
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updateId = document.getElementById('updateId').value;
        const updateContent = document.getElementById('updateContent').value;

        fetch(`/posts/update/${updateId}/${updateContent}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Update response:', data);
                fetchAllPosts(); // Refresh the list of posts
            })
            .catch(error => console.error('Error:', error));
    });

    // Delete a post by ID
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const deleteId = document.getElementById('deleteId').value;

        fetch(`/posts/delete/${deleteId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Delete response:', data);
                fetchAllPosts(); // Refresh the list of posts
            })
            .catch(error => console.error('Error:', error));
    });
});
