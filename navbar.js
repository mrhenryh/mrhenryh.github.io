document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("main-nav");
  if (!navContainer) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navContainer.innerHTML = `
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <div class="nav-links" id="navLinks">
      <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Home</a>
      <a href="mission.html" class="${currentPath === 'mission.html' ? 'active' : ''}">Mission</a>
      <a href="endorsements.html" class="${currentPath === 'endorsements.html' ? 'active' : ''}">Endorsements</a>
      <a href="endorsements-location.html" class="${currentPath === 'endorsements-location.html' ? 'active' : ''}">By Location</a>
      <a href="mypage.html" class="${currentPath === 'mypage.html' ? 'active' : ''}">My Page</a>
      <a href="team.html" class="${currentPath === 'team.html' ? 'active' : ''}">About Team</a>
      <a href="abouttheboard.html" class="${currentPath === 'abouttheboard.html' ? 'active' : ''}">About The Board</a>
      <a href="subscribe.html" class="${currentPath === 'subscribe.html' ? 'active' : ''}">Subscribe</a>
      <a href="contact.html" class="${currentPath === 'contact.html' ? 'active' : ''}">Contact Us</a>
    </div>
  `;

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
  }
});
