/* =========================================================
   دليل قرية إبوان
   Dark Mode + Hamburger Menu + Search
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. DARK MODE
       ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    // استرجاع الوضع المحفوظ
    const savedTheme = localStorage.getItem("siteTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeIcon(true);
    }

    // زر تبديل الوضع
    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            // حفظ الاختيار
            localStorage.setItem(
                "siteTheme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon(isDark);

        });

    }

    function updateThemeIcon(isDark) {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (isDark) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "تفعيل الوضع الفاتح"
            );

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "تفعيل الوضع الداكن"
            );

        }

    }


    /* =====================================================
       2. HAMBURGER MENU
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            mainNav.classList.toggle("show");

            const icon = menuToggle.querySelector("i");

            if (!icon) return;

            if (mainNav.classList.contains("show")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        // إغلاق القائمة عند الضغط على أي رابط
        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });


        // إغلاق القائمة عند الضغط خارجها
        document.addEventListener("click", function (event) {

            if (
                mainNav.classList.contains("show") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNav.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    }


    /* =====================================================
       3. SEARCH
       ===================================================== */

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    const serviceCards =
        document.querySelectorAll(".service-card");


    function performSearch() {

        if (!searchInput) return;

        const searchValue =
            searchInput.value.trim().toLowerCase();

        // لو البحث فاضي
        if (searchValue === "") {

            serviceCards.forEach(function (card) {

                card.style.display = "";

            });

            return;
        }


        let found = false;

        serviceCards.forEach(function (card) {

            const searchData =
                (card.dataset.search || "").toLowerCase();

            const cardText =
                card.innerText.toLowerCase();

            if (
                searchData.includes(searchValue) ||
                cardText.includes(searchValue)
            ) {

                card.style.display = "";
                found = true;

                // حركة بسيطة للكارت
                card.classList.remove("search-highlight");

                setTimeout(function () {
                    card.classList.add("search-highlight");
                }, 10);

            } else {

                card.style.display = "none";

            }

        });


        // لو مفيش نتيجة
        showSearchMessage(!found);

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            performSearch
        );

    }


    // البحث أثناء الكتابة
    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performSearch
        );


        // الضغط على Enter
        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       رسالة عدم وجود نتائج
       ===================================================== */

    function showSearchMessage(show) {

        let message =
            document.getElementById("searchMessage");


        if (show) {

            if (!message) {

                message =
                    document.createElement("div");

                message.id =
                    "searchMessage";

                message.innerHTML = `
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span>مش لاقيين الخدمة دي في الدليل</span>
                `;

                const grid =
                    document.querySelector(".services-grid");

                if (grid) {

                    grid.appendChild(message);

                }

            }

            message.style.display = "flex";

        } else {

            if (message) {

                message.style.display = "none";

            }

        }

    }


    /* =====================================================
       4. ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("#mainNav a");


    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 120;

            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =====================================================
       5. منع الضغط على كروت البحث من عمل مشاكل
       ===================================================== */

    serviceCards.forEach(function (card) {

        card.addEventListener("click", function () {

            // عند الضغط على الكارت
            // نترك الرابط يعمل طبيعيًا

        });

    });

});