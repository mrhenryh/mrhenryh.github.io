const EDITOR_EMAIL = 'Mr_____.Editor@CCA.us.org';
const DISCUSSION_TOPIC = 'Expanding the U.S. House (expandingtheushouse.html)';

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      navToggleBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
  }

  // Toggle Top-Level "Post Your Comment" Panel
  const toggleNewCommentBtn = document.getElementById('toggleNewCommentBtn');
  const cancelNewCommentBtn = document.getElementById('cancelNewCommentBtn');
  const newCommentPanel = document.getElementById('newCommentPanel');

  if (toggleNewCommentBtn && newCommentPanel) {
    toggleNewCommentBtn.addEventListener('click', () => {
      newCommentPanel.classList.toggle('open');
      if (newCommentPanel.classList.contains('open')) {
        newCommentPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (cancelNewCommentBtn && newCommentPanel) {
    cancelNewCommentBtn.addEventListener('click', () => {
      newCommentPanel.classList.remove('open');
    });
  }

  // Handle New Top-Level Comment Form Submission
  const topLevelForm = document.getElementById('topLevelCommentForm');
  if (topLevelForm) {
    topLevelForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('newAuthorName').value.trim();
      const password = document.getElementById('newAuthorPassword').value.trim();
      const title = document.getElementById('newCommentTitle').value.trim();
      const body = document.getElementById('newCommentBody').value.trim();

      const subject = `New Discussion Comment: ${title}`;
      const emailBody =
        `Discussion Page: ${DISCUSSION_TOPIC}\n` +
        `Submission Type: New Top-Level Comment\n\n` +
        `1. Name: ${name}\n` +
        `2. Password: ${password}\n` +
        `3. Title of Comment: ${title}\n` +
        `4. Comment Itself:\n${body}`;

      window.location.href = `mailto:${EDITOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      topLevelForm.reset();
      newCommentPanel.classList.remove('open');
      showSubmissionMessage();
    });
  }

  // Initial Render of Comments
  renderDiscussionFeed();

  // Search & Sort Listeners
  const searchInput = document.getElementById('keywordSearchInput');
  const sortSelect = document.getElementById('sortSelect');
  if (searchInput) searchInput.addEventListener('input', renderDiscussionFeed);
  if (sortSelect) sortSelect.addEventListener('change', renderDiscussionFeed);
});

// Show On-Screen Confirmation Banner
function showSubmissionMessage() {
  const banner = document.getElementById('globalSubmissionBanner');
  if (banner) {
    banner.style.display = 'block';
    banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Render Discussion Feed from JavaScript COMMENTS Array
function renderDiscussionFeed() {
  const feedContainer = document.getElementById('discussionFeed');
  const resultsStatus = document.getElementById('resultsStatus');
  const searchInput = document.getElementById('keywordSearchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (!feedContainer || typeof COMMENTS === 'undefined') return;

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const sortMode = sortSelect ? sortSelect.value : 'newest';

  // Sort top-level comments
  let sortedComments = [...COMMENTS];
  sortedComments.sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    const upA = a.upvotes;
    const upB = b.upvotes;
    const verA = a.verified ? 1 : 0;
    const verB = b.verified ? 1 : 0;

    if (sortMode === 'newest' || sortMode === 'verified-only') {
      return timeB - timeA;
    } else if (sortMode === 'oldest') {
      return timeA - timeB;
    } else if (sortMode === 'most-upvotes') {
      return upB - upA;
    } else if (sortMode === 'least-upvotes') {
      return upA - upB;
    } else if (sortMode === 'verified-first') {
      if (verB !== verA) return verB - verA;
      return timeB - timeA;
    }
    return 0;
  });

  feedContainer.innerHTML = '';
  let visibleCount = 0;

  sortedComments.forEach((item, index) => {
    // Check keyword match in parent title or reply titles
    const parentMatches = item.title.toLowerCase().includes(query) || item.body.toLowerCase().includes(query);
    const repliesMatch = item.replies.some(r => r.title.toLowerCase().includes(query) || r.body.toLowerCase().includes(query));
    const matchesKeyword = query === '' || parentMatches || repliesMatch;
    const matchesVerifiedFilter = sortMode !== 'verified-only' || item.verified;

    if (!matchesKeyword || !matchesVerifiedFilter) return;
    visibleCount++;

    // Alternating border color based on visible position
    const borderColor = index % 2 === 0 ? 'border-red' : 'border-blue';

    const threadDiv = document.createElement('div');
    threadDiv.className = 'thread-group';

    // Badge markup
    const badgeHTML = item.verified
      ? `<span class="badge-verified"><span class="check-icon">&#10003;</span> Verified Member</span>`
      : `<span class="badge-subscriber">Subscriber</span>`;

    const avatarHTML = item.verified && item.avatar
      ? `<img src="${item.avatar}" alt="${item.name}" class="verified-avatar">`
      : '';

    // Build Replies HTML if any exist
    let repliesHTML = '';
    if (item.replies && item.replies.length > 0) {
      let innerRepliesList = '';
      item.replies.forEach((rep, repIndex) => {
        const repBorder = repIndex % 2 === 0 ? 'border-blue' : 'border-red';
        const repBadge = rep.verified
          ? `<span class="badge-verified"><span class="check-icon">&#10003;</span> Verified Member</span>`
          : `<span class="badge-subscriber">Subscriber</span>`;
        const repAvatar = rep.verified && rep.avatar
          ? `<img src="${rep.avatar}" alt="${rep.name}" class="verified-avatar">`
          : '';

        innerRepliesList += `
          <article class="reply-card ${repBorder}">
            <div class="reply-context-header">Replying to ${item.name}, ${item.date}</div>
            <div class="reply-card-body">
              <h4 class="comment-title">${escapeHTML(rep.title)}</h4>
              <div class="comment-header">
                <div class="author-info">
                  ${repAvatar}
                  <div class="author-meta">
                    <div class="author-name-row">
                      <span class="author-name">${escapeHTML(rep.name)}</span>
                      ${repBadge}
                    </div>
                    <span class="comment-date">Published ${escapeHTML(rep.date)}</span>
                  </div>
                </div>
                <div class="upvote-box">
                  <span class="upvote-count">${rep.upvotes}</span>
                  <button type="button" class="btn-upvote" onclick="sendUpvoteEmail(this)">&#9650; Upvote</button>
                </div>
              </div>
              <div class="comment-body">${escapeHTML(rep.body)}</div>
              <div class="comment-actions">
                <button type="button" class="btn-reply" onclick="toggleReplyForm(this)">Reply</button>
              </div>
              <div class="reply-form-container">
                <h4>Reply to ${escapeHTML(rep.name)}</h4>
                <form onsubmit="submitReplyEmail(event, this, '${escapeHTML(rep.name)}', '${escapeHTML(rep.date)}')">
                  <div class="form-grid">
                    <div class="form-group"><label>1. Name *</label><input type="text" name="replyName" required></div>
                    <div class="form-group"><label>2. Password *</label><input type="password" name="replyPassword" required></div>
                  </div>
                  <div class="form-group"><label>3. Title of Comment *</label><input type="text" name="replyTitle" required></div>
                  <div class="form-group"><label>4. Comment Itself *</label><textarea name="replyBody" rows="3" required></textarea></div>
                  <div class="form-btn-row">
                    <button type="submit" class="btn-submit">Submit Reply to Editor</button>
                    <button type="button" class="btn-cancel" onclick="toggleReplyForm(this)">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </article>
        `;
      });

      repliesHTML = `
        <div class="reply-chain-wrapper">
          <button type="button" class="reply-toggle-btn" onclick="toggleReplyChain(this)">&#9662; Hide Replies (${item.replies.length})</button>
          <div class="reply-list">${innerRepliesList}</div>
        </div>
      `;
    }

    // Assemble Main Comment Card
    threadDiv.innerHTML = `
      <article class="comment-card ${borderColor}">
        <h3 class="comment-title">${escapeHTML(item.title)}</h3>
        <div class="comment-header">
          <div class="author-info">
            ${avatarHTML}
            <div class="author-meta">
              <div class="author-name-row">
                <span class="author-name">${escapeHTML(item.name)}</span>
                ${badgeHTML}
              </div>
              <span class="comment-date">Published ${escapeHTML(item.date)}</span>
            </div>
          </div>
          <div class="upvote-box">
            <span class="upvote-count">${item.upvotes}</span>
            <button type="button" class="btn-upvote" onclick="sendUpvoteEmail(this)" title="Send an email to the Editor to upvote this comment">&#9650; Upvote</button>
          </div>
        </div>
        <div class="comment-body">${escapeHTML(item.body)}</div>
        <div class="comment-actions">
          <button type="button" class="btn-reply" onclick="toggleReplyForm(this)">Reply</button>
        </div>
        <div class="reply-form-container">
          <h4>Reply to ${escapeHTML(item.name)}</h4>
          <form onsubmit="submitReplyEmail(event, this, '${escapeHTML(item.name)}', '${escapeHTML(item.date)}')">
            <div class="form-grid">
              <div class="form-group"><label>1. Name *</label><input type="text" name="replyName" placeholder="Your Name" required></div>
              <div class="form-group"><label>2. Password *</label><input type="password" name="replyPassword" placeholder="Your CCA Passcode" required></div>
            </div>
            <div class="form-group"><label>3. Title of Comment *</label><input type="text" name="replyTitle" placeholder="Brief title" required></div>
            <div class="form-group"><label>4. Comment Itself *</label><textarea name="replyBody" rows="3" placeholder="Type your reply..." required></textarea></div>
            <div class="form-btn-row">
              <button type="submit" class="btn-submit">Submit Reply to Editor</button>
              <button type="button" class="btn-cancel" onclick="toggleReplyForm(this)">Cancel</button>
            </div>
          </form>
        </div>
      </article>
      ${repliesHTML}
    `;

    feedContainer.appendChild(threadDiv);
  });

  if (resultsStatus) {
    resultsStatus.textContent = `Showing ${visibleCount} discussion thread${visibleCount === 1 ? '' : 's'}`;
  }
}

// Toggle Inline Reply Form
function toggleReplyForm(button) {
  const card = button.closest('.comment-card, .reply-card-body');
  const formBox = card.querySelector('.reply-form-container');
  if (formBox) formBox.classList.toggle('open');
}

// Toggle Sub-Conversation Reply Chain Visibility
function toggleReplyChain(button) {
  const wrapper = button.closest('.reply-chain-wrapper');
  const list = wrapper.querySelector('.reply-list');
  const replyCount = list.querySelectorAll('.reply-card').length;

  list.classList.toggle('collapsed');
  if (list.classList.contains('collapsed')) {
    button.innerHTML = `&#9656; Show Replies (${replyCount})`;
  } else {
    button.innerHTML = `&#9662; Hide Replies (${replyCount})`;
  }
}

// Handle Reply Form Submission
function submitReplyEmail(event, form, replyingToName, replyingToDate) {
  event.preventDefault();

  const name = form.querySelector('[name="replyName"]').value.trim();
  const password = form.querySelector('[name="replyPassword"]').value.trim();
  const title = form.querySelector('[name="replyTitle"]').value.trim();
  const body = form.querySelector('[name="replyBody"]').value.trim();

  const subject = `New Discussion Reply: ${title}`;
  const emailBody =
    `Discussion Page: ${DISCUSSION_TOPIC}\n` +
    `Submission Type: Reply\n` +
    `Replying To: ${replyingToName} (${replyingToDate})\n\n` +
    `1. Name: ${name}\n` +
    `2. Password: ${password}\n` +
    `3. Title of Comment: ${title}\n` +
    `4. Comment Itself:\n${body}`;

  window.location.href = `mailto:${EDITOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  form.reset();
  form.closest('.reply-form-container').classList.remove('open');
  showSubmissionMessage();
}

// Handle Upvote Button Click
function sendUpvoteEmail(button) {
  const card = button.closest('.comment-card, .reply-card-body');
  const commentText = card.querySelector('.comment-body').innerText.trim();

  const subject = 'Discussion Upvote Request';
  const emailBody = `Please give one upvote to this comment: "${commentText}."`;

  window.location.href = `mailto:${EDITOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
}

// Helper to prevent HTML injection in text
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
