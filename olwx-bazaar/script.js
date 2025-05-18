// ✅ پوسٹس لوڈ کریں (localStorage سے یا خالی array)
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

// ✅ صفحہ دکھانے کا فنکشن (home, blog, etc.)
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  document.getElementById(id).classList.add('active-page');

  // اگر ہم home پر آئے تو دوبارہ پوسٹس دکھائیں
  if (id === 'home') renderPosts();
}

// ✅ ہوم پیج پر پوسٹس دکھانے کا فنکشن (صرف فوٹو، قیمت، مقام)
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
    div.onclick = () => openPost(index); // تفصیل دکھانے کے لیے کلک
    container.appendChild(div);
  });
}

// ✅ بلاگ پیج میں پوسٹ تفصیل دکھانا
function openPost(index) {
  const post = posts[index];
  const detail = document.getElementById("postDetails");

  detail.innerHTML = `
    <h3>${post.title}</h3>
    <img src="${post.image}" style="width:200px;border-radius:15px;" />
    <p><strong>Price:</strong> ${post.price} PKR</p>
    <p><strong>Location:</strong> ${post.location}</p>
    <p>${post.description}</p>
    <br>
    <button onclick="showPage('home')">← Back to Home</button>
  `;

  showPage('blog');
}

// ✅ سرچ فنکشن (فی الحال صرف alert ہے)
function searchPost() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  alert("Search for: " + q);
}

// ✅ +Add بٹن پر Sample Ad شامل کرنا
function addSamplePost() {
  const newPost = {
    title: "New Sample Post",
    price: "12345",
    location: "Test City",
    description: "This is a test ad post from +Add button.",
    image: "https://via.placeholder.com/100"
  };

  posts.unshift(newPost); // نئی پوسٹ سب سے اوپر
  localStorage.setItem("posts", JSON.stringify(posts)); // محفوظ کریں
  renderPosts(); // تازہ پوسٹس دکھائیں
  alert("Post added successfully!");
}

// ✅ جب پیج لوڈ ہو تو پوسٹس دکھائیں
window.onload = renderPosts;
