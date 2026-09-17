document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("main-nav");
  if (!navContainer) return;

  // Detect current filename to set the active link automatically
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Build the Navigation HTML
  navContainer.innerHTML = `
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <div class="nav-links" id="navLinks">
      <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Home</a>
      <a href="mission.html" class="${currentPath === 'mission.html' ? 'active' : ''}">Mission</a>
      <a href="mypage.html" class="${currentPath === 'mypage.html' ? 'active' : ''}">My Page</a>
      <a href="subscribe.html" class="${currentPath === 'subscribe.html' ? 'active' : ''}">Subscribe</a>
    </div>
  `;

  // Toggle dropdown and animate hamburger icon to "X"
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });
});