document.addEventListener("DOMContentLoaded", function () {
    // Optimize Top Bar Loading
    fetch("topbar.html") // Load the top bar from an external file
        .then(response => response.text())
        .then(html => {
            document.getElementById("topbar-container").innerHTML = html;
        })
        .catch(error => console.error("Error loading top bar:", error));

    // Smooth Scroll Experience
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust offset if needed
                    behavior: "smooth"
                });
            }
        });
    });

    // Lazy Load Content for Better Performance
    const sections = document.querySelectorAll("section");
    const options = {
        rootMargin: "100px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
