document.addEventListener("DOMContentLoaded", function () {
    const languageButton = document.getElementById("languageButton");
    const languagePopup = document.getElementById("languagePopup");
    const closePopup = document.getElementById("closePopup");
    const selectElement = document.getElementById("languageSelect");
    const changeButton = document.getElementById("changeButton");

    // Load language from localStorage
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setLanguage(savedLanguage);

    // Show popup
    languageButton.onclick = () => (languagePopup.style.display = "block");

    // Hide popup
    closePopup.onclick = () => (languagePopup.style.display = "none");

    // Hide popup when clicking outside
    window.onclick = (event) => {
        if (event.target === languagePopup) languagePopup.style.display = "none";
    };

    // Change language
    changeButton.onclick = () => {
        const selectedLang = selectElement.value;
        setLanguage(selectedLang);
        localStorage.setItem("selectedLanguage", selectedLang);
        languagePopup.style.display = "none";
    };

    // Function to set language
    function setLanguage(language) {
        // Update the body with the selected language
        document.body.setAttribute("data-lang", language);
        document.querySelector("footer").setAttribute("data-lang", language);

        // Update all elements that have translatable text
        document.querySelectorAll("[data-en]").forEach((element) => {
            // Update text content
            element.innerText =
                element.getAttribute(`data-${language}`) || element.getAttribute("data-en");
        });

        // Update placeholders for input fields
        document.querySelectorAll("input[placeholder][data-en]").forEach((input) => {
            input.setAttribute(
                "placeholder",
                input.getAttribute(`data-${language}`) || input.getAttribute("data-en")
            );

            // Align the placeholder text based on the language
            if (["ur", "sd", "ar"].includes(language)) {
                input.style.textAlign = "right"; // Align placeholder text to the right for RTL languages
            } else {
                input.style.textAlign = "left"; // Align placeholder text to the left for LTR languages
            }
        });

        // Ensure correct RTL for languages like Sindhi, Urdu, and Arabic
        if (["ur", "sd", "ar"].includes(language)) {
            document.body.style.direction = "rtl"; // Set body direction to RTL for Sindhi, Urdu, and Arabic
        } else {
            document.body.style.direction = "ltr"; // Set body direction to LTR for others
        }

        // Set the dropdown to the current language
        selectElement.value = language;
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            languagePopup.style.display = "none";
        }
    });
});
