document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    /* =========================================
       قراءة الوضع المحفوظ
    ========================================= */

    const savedTheme = localStorage.getItem("siteTheme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }


    /* =========================================
       إنشاء زر الوضع الليلي
    ========================================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        const themeButton = document.createElement("button");

        themeButton.className = "theme-toggle";
        themeButton.type = "button";

        const isDark = body.classList.contains("dark-mode");

        themeButton.setAttribute(
            "aria-label",
            isDark
                ? "تفعيل الوضع الفاتح"
                : "تفعيل الوضع الداكن"
        );

        themeButton.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        navbar.appendChild(themeButton);


        /* =========================================
           تغيير الوضع
        ========================================= */

        themeButton.addEventListener("click", function () {

            body.classList.toggle("dark-mode");

            const darkMode =
                body.classList.contains("dark-mode");

            localStorage.setItem(
                "siteTheme",
                darkMode ? "dark" : "light"
            );


            if (darkMode) {

                themeButton.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

                themeButton.setAttribute(
                    "aria-label",
                    "تفعيل الوضع الفاتح"
                );

            } else {

                themeButton.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

                themeButton.setAttribute(
                    "aria-label",
                    "تفعيل الوضع الداكن"
                );

            }

        });

    }


    /* =========================================
       حركة بسيطة للكروت
    ========================================= */

    const shopCards =
        document.querySelectorAll(".shop-card");

    shopCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.zIndex = "2";

        });

        card.addEventListener("mouseleave", function () {

            card.style.zIndex = "1";

        });

    });

});