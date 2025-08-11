const portfolioItems = [
  {
    title: "Corporate Essentials",
    category: "stock",
    summary: "Professional stock footage edit showcasing modern business environments and team collaboration.",
    vimeoId: "1108892671"
  },
  {
    title: "From Credit Repair to Business Launch",
    category: "ui",
    summary: "Dynamic UI animation sequence illustrating financial transformation through interactive elements.",
    vimeoId: "1108892715"
  },
  {
    title: "Airbnb Growth Simplified",
    category: "motion",
    summary: "Motion graphic explainer visualizing rental business growth through animated data storytelling.",
    vimeoId: "1108892817"
  },
  {
    title: "30 Minutes to the Top",
    category: "motion",
    summary: "Fast-paced motion graphics piece demonstrating rapid business growth strategies.",
    vimeoId: "1108892839"
  },
  {
    title: "Who I Am",
    category: "motion",
    summary: "Personal brand motion piece combining psychological storytelling with kinetic typography.",
    vimeoId: "1108892883"
  },
  {
    title: "Who I Am",
    category: "ui",
    summary: "Interactive UI version of personal brand story with animated interface elements.",
    vimeoId: "1108892942"
  }
];

function getCategoryLabel(cat) {
  if (cat === 'motion') return "Motion Graphics";
  if (cat === 'ui') return "UI Animation";
  if (cat === 'stock') return "Stock Videos Edit";
  return cat;
}

function createVideoThumbnail(vimeoId) {
  // Vimeo thumbnail URL pattern: https://i.vimeocdn.com/video/{id}_295x166.jpg
  // But Vimeo doesn't provide direct thumbnail by video ID easily.
  // So, instead of fetching thumbnails from Vimeo API (which requires OAuth),
  // We’ll show a play button overlay on a black background as a placeholder.

  // You can replace this with a custom thumbnail image URL if you have one.
  return `
    <div class="video-thumbnail">
      <div style="background:#000; width:100%; height:0; padding-bottom:56.25%; position:relative; border-radius:10px;">
        <div class="play-button">&#9658;</div>
      </div>
    </div>
  `;
}

function initPortfolio() {
  const grid = document.querySelector('.portfolio-grid');
  grid.innerHTML = ''; // Clear existing

  portfolioItems.forEach(item => {
    const project = document.createElement('div');
    project.className = 'portfolio-item';
    project.dataset.category = item.category;

    project.innerHTML = `
      <div class="video-container" data-vimeo-id="${item.vimeoId}">
        ${createVideoThumbnail(item.vimeoId)}
      </div>
      <div class="portfolio-overlay">
        <span class="portfolio-category">${getCategoryLabel(item.category)}</span>
        <h3 class="portfolio-title">${item.title}</h3>
        <p class="portfolio-desc">${item.summary}</p>
      </div>
    `;

    grid.appendChild(project);
  });

  setupVideoClick();
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function setupVideoClick() {
  // When user clicks on the video thumbnail, open modal with Vimeo player
  const videoContainers = document.querySelectorAll('.video-container');
  const modal = document.querySelector('.video-modal');
  const modalContent = document.querySelector('.video-modal .modal-content iframe');
  const closeBtn = document.querySelector('.close-modal');

  videoContainers.forEach(container => {
    container.addEventListener('click', () => {
      const vimeoId = container.dataset.vimeoId;
      modal.style.display = 'flex';
      modalContent.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalContent.src = ''; // Stop video playback
  });

  // Close modal if user clicks outside the video iframe area
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalContent.src = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  setupFilters();
});
