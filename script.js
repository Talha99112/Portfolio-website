// JavaScript
// Portfolio Data
const portfolioItems = [
  {
    title: "Corporate Essentials",
    category: "stock",
    desc: "Professional stock footage edit showcasing modern business environments and team collaboration.",
    tags: ["Corporate", "Stock Footage", "Business"],
    videoId: "1TC4iuPicbLfdHIgWDXDSX_9oIL9-2K0m"
  },
  {
    title: "From Credit Repair to Business Launch",
    category: "ui",
    desc: "Dynamic UI animation sequence illustrating financial transformation through interactive elements.",
    tags: ["UI/UX", "Financial", "Micro-interactions"],
    videoId: "1ugdZ_lIiCQalB2OHuqzt-j7I31ligxlQ"
  },
  {
    title: "Airbnb Growth Simplified",
    category: "motion",
    desc: "Motion graphic explainer visualizing rental business growth through animated data storytelling.",
    tags: ["Explainer", "Data Visualization", "After Effects"],
    videoId: "1ve5S9JgCPv4_SeOyHerYqshpY8vkD16p"
  },
  {
    title: "30 Minutes to the Top",
    category: "motion",
    desc: "Fast-paced motion graphics piece demonstrating rapid business growth strategies.",
    tags: ["Business", "Fast-cut", "Kinetic Typography"],
    videoId: "14r8xV1xbV3Lv3gITUkmTPYrg0D3oCGSq"
  },
  {
    title: "Who I Am (Motion)",
    category: "motion",
    desc: "Personal brand motion piece combining psychological storytelling with kinetic typography.",
    tags: ["Personal Brand", "Typography", "Storytelling"],
    videoId: "1VEZ1r9uncFmnYb3_yDh3WYzdrtWArNcG"
  },
  {
    title: "Who I Am (UI)",
    category: "ui",
    desc: "Interactive UI version of personal brand story with animated interface elements.",
    tags: ["Interactive", "Personal Brand", "UI Design"],
    videoId: "1CN8TBHZZaGY2nDL1eIgGqU9deH71u-lK"
  }
];

// Initialize Portfolio Grid
function initPortfolio() {
  const grid = document.querySelector('.portfolio-grid');
  
  portfolioItems.forEach(item => {
    const project = document.createElement('div');
    project.className = `portfolio-item`;
    project.dataset.category = item.category;
    
    project.innerHTML = `
      <img src="https://drive.google.com/thumbnail?id=${item.videoId}&sz=w1000" alt="${item.title}" class="portfolio-thumbnail">
      <div class="portfolio-overlay">
        <span class="portfolio-category">${item.category === 'motion' ? 'Motion Graphics' : 
                                        item.category === 'ui' ? 'UI Animations' : 'Stock Video Edits'}</span>
        <h3 class="portfolio-title">${item.title}</h3>
        <p class="portfolio-desc">${item.desc}</p>
        <div class="portfolio-tags">
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="#" class="view-btn" data-video="${item.videoId}">View Project</a>
      </div>
    `;
    
    grid.appendChild(project);
  });
}

// Filter Portfolio Items
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter items
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

// Video Modal
function setupModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const viewBtns = document.querySelectorAll('.view-btn');
  const closeModal = document.querySelector('.close-modal');
  
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = btn.dataset.video;
      modalVideo.src = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1`;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modalVideo.src = '';
      document.body.style.overflow = 'auto';
    }
  });
}

// Form Submission
function setupForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value
    };
    
    // Here you would typically send to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Message sent successfully! I\'ll get back to you soon.');
    this.reset();
  });
}

// Smooth Scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  setupFilters();
  setupModal();
  setupForm();
  setupSmoothScrolling();
  
  // Add animation to elements when they scroll into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hero-text, .section-header, .journey-section, .education-item, .expertise-item, .contact-content > *');
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.8);
      
      if (isVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  document.querySelectorAll('.hero-text, .section-header, .journey-section, .education-item, .expertise-item, .contact-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});