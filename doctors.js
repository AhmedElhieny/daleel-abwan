document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    // قراءة الوضع المحفوظ
    const savedTheme = localStorage.getItem("siteTheme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }

    // إضافة زر الدارك مود داخل الـ Navbar
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

        // تبديل الوضع
        themeButton.addEventListener("click", function () {

            body.classList.toggle("dark-mode");

            const isDark = body.classList.contains("dark-mode");

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