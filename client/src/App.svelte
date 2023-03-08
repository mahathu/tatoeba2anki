<script>
	let translations = [];
	let query = "araba";
	let find_similar = true;
	let lang_from = "tur";
	let lang_to = "deu";

	const langs = [
		{ code: "eng", name: "English" },
		{ code: "deu", name: "German" },
		{ code: "fra", name: "French" },
		{ code: "ita", name: "Italian" },
		{ code: "spa", name: "Spanish" },
		{ code: "por", name: "Portuguese" },
		{ code: "rus", name: "Russian" },
		{ code: "jpn", name: "Japanese" },
		{ code: "kor", name: "Korean" },
		{ code: "zho", name: "Chinese" },
		{ code: "tur", name: "Turkish" },
		{ code: "pes", name: "Persian" },
	];

	function handleClick() {
		translations = getTranslations();
	}

	async function getTranslations() {
		const URL_PARAMS = new URLSearchParams({
			query: query,
			lang_from: lang_from,
			lang_to: lang_to,
			find_similar: find_similar,
		});
		const API_URL = `./api/v0/translations?${URL_PARAMS.toString()}`;

		const response = await fetch(API_URL);
		translations = await response.json();
	}
</script>

<main>
	<h3>tatoeba2anki</h3>
	<!-- <p>
		Tatoeba2Anki is a web application that utilizes the contributions of the
		open source community to enable language learners to build their own
		personalized study materials. By uploading a custom lexicon, users can
		obtain real-life example sentences, which they can download in CSV or
		APKG format to suit their learning preferences. Tatoeba2Anki's
		straightforward interface and streamlined upload process make it quick
		and easy to generate high-quality study materials. The application
		offers a flexible solution for anyone looking to improve their language
		skills using authentic examples of language usage. Give Tatoeba2Anki a
		try today and enhance your language learning journey with real-life
		sentences!
	</p> -->

	<form on:submit|preventDefault={handleClick}>
		<label for="langFromSelect">Source language:</label>
		<select id="langFromSelect" bind:value={lang_from}>
			{#each langs as language}
				<option value={language.code}>{language.name}</option>
			{/each}
		</select>

		<label for="langToSelect">Target language:</label>
		<select id="langToSelect" bind:value={lang_to}>
			{#each langs as language}
				<option value={language.code}>{language.name}</option>
			{/each}
		</select>
		<br />
		<hr />
		<label>
			<input type="checkbox" bind:checked={find_similar} />
			Find similar words
		</label>
		<br />
		<hr />

		<input type="text" bind:value={query} />
		<button type="submit">Click me.</button>
	</form>

	{#await translations}
		<div class="spinner" />
	{:then}
		{#if translations.length > 0}
			<table>
				<tr>
					<th>Original author</th>
					<th>Sentence</th>
					<th>Translation</th>
				</tr>
				{#each translations as t}
					<tr>
						<td>{t.author}</td>
						<td>{t.original}</td>
						<td>{t.translation}</td>
					</tr>
				{/each}
			</table>
		{:else}
			No translations.
		{/if}
	{/await}
</main>

<style>
	main {
		font-family: "EB Garamond", "Optima", sans-serif;
		max-width: 640px;
		margin: 0 auto;
	}

	table {
		width: 100%;
	}

	table tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	table td {
		padding: 3px 6px;
	}

	.spinner {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 5px solid rgba(0, 0, 0, 0.1);
		border-top-color: #000;
		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
