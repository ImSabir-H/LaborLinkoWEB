document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.bottom-nav a');
  navLinks.forEach(link => {
      link.addEventListener('click', function () {
          navLinks.forEach(link => link.classList.remove('active')); // Remove active class from all
          this.classList.add('active'); // Add active class to the clicked link
      });
  });
});
// left right navigation
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

const swipeThreshold = 50; // Minimum horizontal distance (in pixels) to trigger the swipe

// List of pages in order
const pages = ['services.html', 'home.html', 'about.html'];

function checkSwipe() {
    // Calculate horizontal and vertical swipe distances
    const horizontalDistance = touchendX - touchstartX;
    const verticalDistance = touchendY - touchstartY;

    // Only trigger horizontal swipe if horizontal distance is greater than vertical distance and exceeds the threshold
    if (Math.abs(horizontalDistance) > Math.abs(verticalDistance) && Math.abs(horizontalDistance) > swipeThreshold) {
        if (horizontalDistance < 0) {
            // Swiped left (go to the next page)
            navigateToNextPage();
        } else if (horizontalDistance > 0) {
            // Swiped right (go to the previous page)
            navigateToPreviousPage();
        }
    }
}

function navigateToNextPage() {
    let currentPage = window.location.pathname.split('/').pop(); // Get the current page
    let currentIndex = pages.indexOf(currentPage);

    // Check if it's not the last page
    if (currentIndex < pages.length - 1) {
        window.location.href = pages[currentIndex + 1]; // Go to next page
    }
}

function navigateToPreviousPage() {
    let currentPage = window.location.pathname.split('/').pop(); // Get the current page
    let currentIndex = pages.indexOf(currentPage);

    // Check if it's not the first page
    if (currentIndex > 0) {
        window.location.href = pages[currentIndex - 1]; // Go to previous page
    }
}

document.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    checkSwipe();
}, false);

