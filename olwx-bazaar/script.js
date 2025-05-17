
const posts = JSON.parse(localStorage.getItem("posts") || "[]");

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  document.getElementById(id).classList.add('active-page');
  if (id === 'home') renderPosts();
}

function renderPosts() {
  const container = document.getElementById("postList");
  container.innerHTML = "";
  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post-card";
    div.innerHTML = `
      <img src="${post.image}" />
      <p><strong>${post.price} PKR</strong></p>
      <p>${post.location}</p>
    `;
    div.onclick = () => openPost(index);
    container.appendChild(div);
  });
}

function openPost(index) {
  const post = posts[index];
  const detail = document.getElementById("postDetails");
  detail.innerHTML = `
    <h3>${post.title}</h3>
    <img src="${post.image}" style="width:200px;border-radius:15px;" />
    <p><strong>Price:</strong> ${post.price} PKR</p>
    <p><strong>Location:</strong> ${post.location}</p>
    <p>${post.description}</p>
  `;
  showPage('blog');
}

function searchPost() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  alert("Search for: " + q);
}

function addSamplePost() {
  const newPost = {
    title: "New Sample Post",
    price: "12345",
    location: "Test City",
    description: "This is a test ad post from +Add button.",
    image: "https://via.placeholder.com/100"
  };
  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}
window.onload = renderPosts;
