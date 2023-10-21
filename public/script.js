document.addEventListener("DOMContentLoaded", () => {
  const addForm = document.getElementById("addForm");
  const allPosts = document.getElementById("allPosts");
  const getPostForm = document.getElementById("getPostForm");
  const singlePost = document.getElementById("singlePost");
  const updateForm = document.getElementById("updateForm");
  const deleteForm = document.getElementById("deleteForm");

  // Function to fetch and display all posts
  const fetchAllPosts = () => {
    fetch("/contact")
      .then((response) => response.json())
      .then((data) => {
        allPosts.innerHTML = "";
        data.forEach((contact) => {
          const li = document.createElement("li");
          li.textContent = `ID: ${contact.id}, Name: ${contact.name}, Phone: ${contact.phone}`;
          allPosts.appendChild(li);
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  fetchAllPosts();

  // Add a new post
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    fetch("/contact/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add response:", data);
        fetchAllPosts(); // Refresh the list of posts
      })
      .catch((error) => console.error("Error:", error));
  });

  // Get a post by ID
  getPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postId = document.getElementById("postId").value;

    fetch(`/contact/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        singlePost.textContent = `ID: ${data.id}, Name: ${data.name}`;
      })
      .catch((error) => console.error("Error:", error));
  });

  // Update a post by ID
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updateId = document.getElementById("updateId").value;
    const updateName = document.getElementById("updateName").value;
    const updatePhone = document.getElementById("updatePhone").value;

    const requestBody = {
      name: updateName,
      phone: updatePhone,
    };

    fetch(`/contact/update/${updateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update response:", data);
        fetchAllPosts(); // Refresh the list of posts
      })
      .catch((error) => console.error("Error:", error));
  });

  // Delete a post by ID
  deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const deleteId = document.getElementById("deleteId").value;

    fetch(`/contact/delete/${deleteId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete response:", data);
        fetchAllPosts(); // Refresh the list of posts
      })
      .catch((error) => console.error("Error:", error));
  });
});
