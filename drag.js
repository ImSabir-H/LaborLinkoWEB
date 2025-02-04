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

// Enable Mixed Content Mode for WebView Security
if (window.location.protocol === 'http:' && window.location.hostname !== 'imsabir-h.github.io') {
    window.location.href = window.location.href.replace('http:', 'https:');
}

// Handle GeoLocation Permissions for WebView
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("GeoLocation is enabled:", position);
        // You can send the location data to your server here for location-based features
    }, function(error) {
        console.error("GeoLocation error:", error);
    });
} else {
    console.log("GeoLocation is not supported by this browser.");
}

// Handle Image or File Uploads
document.getElementById('fileUpload').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        var formData = new FormData();
        formData.append("file", file);
        // Replace URL with your actual upload URL
        fetch('https://yourserver.com/upload', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
            alert('File uploaded successfully!');
        }).catch(error => {
            console.error('Upload error:', error);
            alert('Error uploading file!');
        });
    }
});

// Handle external links opening in a separate browser
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
        let href = this.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            event.preventDefault();
            window.location.href = href; // Open the link in a new tab or browser
        }
    });
});

// Handle deep linking for specific pages (e.g., job details page)
function handleDeepLink() {
    let urlParams = new URLSearchParams(window.location.search);
    let pageId = urlParams.get('id'); // Get ID from query params, if available
    if (pageId) {
        // Load specific content dynamically based on the page ID
        loadPageContent(pageId);
    }
}

function loadPageContent(pageId) {
    // Example: dynamically load content from your server based on pageId
    fetch(`https://yourserver.com/api/getPage?id=${pageId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('pageContent').innerHTML = data.content;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

// Handle JavaScript alert boxes
function showAlert(message) {
    let alertBox = document.createElement('div');
    alertBox.classList.add('alert');
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000); // Remove after 3 seconds
}

// Handle form submission and upload progress (show progress bar)
function handleFileUpload(event) {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];
    if (file) {
        let formData = new FormData();
        formData.append('file', file);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload');
        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                let percent = (event.loaded / event.total) * 100;
                document.getElementById('uploadProgress').style.width = percent + '%';
            }
        };
        xhr.onload = function() {
            if (xhr.status == 200) {
                showAlert('File uploaded successfully!');
            } else {
                showAlert('File upload failed.');
            }
        };
        xhr.send(formData);
    }
}

// Handle custom error pages
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.message);
    document.body.innerHTML = '<h1>Sorry, something went wrong!</h1><p>Please try again later.</p>';
});

// Handle back button behavior for dynamic pages
window.onpopstate = function(event) {
    if (event.state) {
        // Handle navigation to different pages within the WebView
        loadPageContent(event.state.pageId);
    }
};

// Enable location-based features using GeoLocation API
function enableLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Current position:', position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert('GeoLocation is not supported by this browser.');
    }
}

// Use Custom Error Pages for Offline or Error States
function loadOfflinePage() {
    document.body.innerHTML = '<h1>You are offline</h1><p>Please check your internet connection and try again.</p>';
}
