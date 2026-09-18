document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       DARK MODE
    ========================================= */

    const body = document.body;

    // استرجاع الوضع المحفوظ من الصفحة الرئيسية
    const savedTheme = localStorage.getItem("siteTheme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }


    /* =========================================
       إضافة زر الوضع الداكن للصفحة
    ========================================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        const themeButton = document.createElement("button");

        themeButton.className = "theme-toggle";
        themeButton.type = "button";
        themeButton.setAttribute(
            "aria-label",
            savedTheme === "dark"
                ? "تفعيل الوضع الفاتح"
                : "تفعيل الوضع الداكن"
        );

        themeButton.innerHTML =
            savedTheme === "dark"
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

        navbar.appendChild(themeButton);


        themeButton.addEventListener("click", function () {

            body.classList.toggle("dark-mode");

            const isDark =
                body.classList.contains("dark-mode");

            localStorage.setItem(
                "siteTheme",
                isDark ? "dark" : "light"
            );

            if (isDark) {

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

});