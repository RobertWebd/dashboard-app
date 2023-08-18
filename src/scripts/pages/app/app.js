const sectionDashboard = document.getElementById('section-dashboard');
const sectionLinks = document.querySelector('.section__links');
const sections = document.querySelectorAll('.section');

let currentSection = sectionDashboard.getAttribute('id');

sectionDashboard.classList.add('active');

sectionLinks.addEventListener('click', (e) => {
  const section = e.target.closest('.section');
  const sectionId = section.getAttribute('id');

  if (currentSection === sectionId) return;

  sections.forEach((item) => {
    const itemId = item.getAttribute('id');

    if (itemId === sectionId) {
      currentSection = itemId;
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});


