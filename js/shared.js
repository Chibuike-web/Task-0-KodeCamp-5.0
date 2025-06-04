const toggleTheme = document.querySelector(".toggle-theme");
let isDarkMode = localStorage.getItem("darkMode") === "true";

if (isDarkMode) {
	document.body.classList.add("dark-mode", isDarkMode);
}

toggleTheme.addEventListener("click", function (e) {
	e.preventDefault();
	isDarkMode = !isDarkMode;
	document.body.classList.toggle("dark-mode", isDarkMode);
	localStorage.setItem("darkMode", isDarkMode);
});
