const container = document.getElementById("country-details");
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

const fetchCountry = async () => {
	try {
		const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
		const data = await res.json();
		const country = data[0];

		const currencies = country.currencies
			? Object.values(country.currencies)
					.map((c) => c.name)
					.join(", ")
			: "N/A";

		const nativeName = country.name.nativeName
			? Object.values(country.name.nativeName)[0].common
			: country.name.common;

		container.innerHTML = `
				<figure class="image-container">
					<img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
				</figure>
				<div class="content-container">
					<h2>${country.name.common}</h2>
					<div class="details-columns">
						<div>
							<p><strong>Native Name:</strong> ${nativeName}</p>
							<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
							<p><strong>Region:</strong> ${country.region}</p>
							<p><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
							<p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
						</div>
						<div>
							<p><strong>Top Level Domain:</strong> ${country.tld?.join(", ") || "N/A"}</p>
							<p><strong>Currencies:</strong> ${currencies}</p>
							<p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
						</div>
					</div>
					<div class="border-countries">
						<strong>Border Countries:</strong> <div class="borders-list">Loading...</div>
					</div>
				</div>
			`;

		const bordersList = container.querySelector(".borders-list");
		const borderCountries = container.querySelector(".border-countries");

		if (country.borders && country.borders.length > 0) {
			const bordersRes = await fetch(
				`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`
			);
			const bordersData = await bordersRes.json();

			bordersList.innerHTML = "";
			borderCountries.style.alignItems = "flex-start";

			bordersData.forEach((borderCountry) => {
				const span = document.createElement("a");
				span.className = "border-btn";
				span.href = `details.html?code=${borderCountry.cca3}`;
				span.textContent = borderCountry.name.common;
				bordersList.appendChild(span);
			});
		} else {
			bordersList.textContent = "None";
			borderCountries.style.alignItems = "";
		}
	} catch (error) {
		container.innerHTML = "<p>Could not load country data.</p>";
		console.error(error);
	}
};

if (code) {
	fetchCountry();
} else {
	container.innerHTML = "<p>No country selected.</p>";
}
