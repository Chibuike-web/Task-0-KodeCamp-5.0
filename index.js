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

		filterBtn.addEventListener("change", handleFilterAndSearch);
		searchInput.addEventListener("input", handleFilterAndSearch);
	} catch (error) {
		console.log("Issue fetching lists", error);
	}
};

const handleFilterAndSearch = () => {
	const regionValue = filterBtn.value;
	const searchValue = searchInput.value.toLowerCase();

	const filtered = allCountries.filter((country) => {
		const matchesRegion = regionValue ? country.region === regionValue : true;
		const matchesSearch = country.name.common.toLowerCase().includes(searchValue);
		return matchesRegion && matchesSearch;
	});

	countryList.innerHTML = "";
	createList(filtered);
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
