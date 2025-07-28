 // Sample JSON data for search functionality
        const searchData = {
            "keywords": [
                { "name": "HTML", "url": "html.html", "category": "language" },
                { "name": "CSS", "url": "css.html", "category": "language" },
                { "name": "JavaScript", "url": "javascript.html", "category": "language" },
                { "name": "Java", "url": "java.html", "category": "language" },
                { "name": "Python", "url": "python.html", "category": "language" },
                { "name": "C", "url": "c.html", "category": "language" },
                { "name": "C++", "url": "cpp.html", "category": "language" },
                { "name": "React-Native", "url": "react-native.html", "category": "language" },
                { "name": "Project 1", "url": "project1.html", "category": "project" },
                { "name": "Project 2", "url": "project2.html", "category": "project" },
                { "name": "Project 3", "url": "project3.html", "category": "project" },
                { "name": "Portfolio", "url": "index.html", "category": "general" },
                { "name": "About", "url": "about.html", "category": "general" },
                { "name": "Contact", "url": "contact.html", "category": "general" }
            ]
        };

        // Improved explore dropdown functionality with better timing
        const exploreBtn = document.getElementById('exploreBtn');
        const exploreDropdown = document.getElementById('exploreDropdown');
        const exploreContainer = document.querySelector('.explore-container');
        let dropdownTimeout;
        let isDropdownOpen = false;

        function showDropdown() {
            clearTimeout(dropdownTimeout);
            exploreDropdown.classList.add('show');
            isDropdownOpen = true;
        }

        function hideDropdown() {
            dropdownTimeout = setTimeout(() => {
                exploreDropdown.classList.remove('show');
                isDropdownOpen = false;
            }, 300); // 300ms delay before hiding
        }

        // Show dropdown on button hover
        exploreBtn.addEventListener('mouseenter', showDropdown);

        // Show dropdown on dropdown hover (keeps it open)
        exploreDropdown.addEventListener('mouseenter', showDropdown);

        // Hide dropdown when leaving container
        exploreContainer.addEventListener('mouseleave', hideDropdown);

        // Also handle dropdown mouse leave
        exploreDropdown.addEventListener('mouseleave', hideDropdown);

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length === 0) {
                searchSuggestions.classList.remove('show');
                return;
            }

            const matches = searchData.keywords.filter(item =>
                item.name.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                displaySuggestions(matches);
                searchSuggestions.classList.add('show');
            } else {
                searchSuggestions.classList.remove('show');
            }
        });

        function displaySuggestions(matches) {
            searchSuggestions.innerHTML = matches.map(match =>
                `<div class="suggestion-item" onclick="navigateToPage('${match.url}')">
                    <i class="fas fa-${getIcon(match.category)} mr-2"></i>
                    ${match.name}
                    <span class="text-xs text-gray-500 ml-2">${match.category}</span>
                </div>`
            ).join('');
        }

        function getIcon(category) {
            switch (category) {
                case 'language': return 'code';
                case 'project': return 'folder';
                case 'general': return 'file';
                default: return 'search';
            }
        }

        function navigateToPage(url) {
            window.location.href = url;
            searchSuggestions.classList.remove('show');
            searchInput.value = '';
        }

        // Close search suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchSuggestions.classList.remove('show');
            }
        });

        // Handle Enter key in search
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstSuggestion = searchSuggestions.querySelector('.suggestion-item');
                if (firstSuggestion) {
                    firstSuggestion.click();
                }
            }
        });

        // Smooth scrolling and animations
        document.addEventListener('DOMContentLoaded', () => {
            // Add smooth fade-in animation
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add keyboard navigation for dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                clearTimeout(dropdownTimeout);
                exploreDropdown.classList.remove('show');
                searchSuggestions.classList.remove('show');
                isDropdownOpen = false;
            }
        });

         // Language Slider 
    const langImages = [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    ];
    const langAlts = [
        "HTML", "CSS", "Java", "Python", "C", "C++", "React-Native"
    ];
    let langCurrent = 0;
    const langImgElem = document.getElementById('currentLangImg');

    setInterval(() => {
        langCurrent = (langCurrent + 1) % langImages.length;
        langImgElem.src = langImages[langCurrent];
        langImgElem.alt = langAlts[langCurrent];
    }, 3000);