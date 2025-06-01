const countryList = document.getElementById("country-list");
const filterBtn = document.querySelector(".filter");
const searchInput = document.querySelector(".search-input");
let allCountries = [];

const fetchData = async () => {
	try {
		const res = await fetch("https://restcountries.com/v3.1/all");
		if (!res.ok) {
			throw new Error("Issue fetching data");
		}
		const data = await res.json();
		allCountries = data;
		createList(data);
	} catch (error) {
		console.log("Issue fetching lists", error);
	}
};

const handleFilterAndSearch = () => {
	const regionValue = filterBtn.value;
	const searchValue = searchInput.value.toLowerCase();

	try {
		const filtered = allCountries.filter((country) => {
			const name = country?.name?.common?.toLowerCase?.() || "";
			const matchesRegion = regionValue ? country.region === regionValue : true;
			const matchesSearch = name.includes(searchValue);
			return matchesRegion && matchesSearch;
		});

		countryList.innerHTML = "";

		if (filtered.length === 0) {
			countryList.innerHTML = `
      <p class="not-found-message">No countries found.</p>`;
		} else {
			createList(filtered);
		}
	} catch (err) {
		console.error("Search/filter error:", err);
		countryList.innerHTML = `<p class="error-message">Something went wrong while filtering. Try again later.</p>`;
	}
};

const createList = (countries) => {
	countries.forEach((country) => {
		const list = document.createElement("li");
		list.classList.add("country-card");

		list.innerHTML = `
		   <a href="details.html?code=${country.cca3}">
		       <figure> <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" /></figure>
		        <div class="content">
		          <h3 class="heading">${country.name.common}</h3>
		          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
		          <p><strong>Region:</strong> ${country.region}</p>
		          <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
		        </div>
		      </a>
		    `;

		countryList.appendChild(list);
	});
};

fetchData();
filterBtn.addEventListener("change", handleFilterAndSearch);
searchInput.addEventListener("input", handleFilterAndSearch);

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
