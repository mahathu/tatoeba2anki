<script>
	import Form from "./Form.svelte";
	import TranslationTable from "./TranslationTable.svelte";
	import Spinner from "./Spinner.svelte";
	let translatedSentences = [];

	function handleTranslations(event) {
		console.log(event.detail);
		translatedSentences = event.detail;
	}
</script>

<main>
	<h1>tatoeba2anki</h1>
	<p>
		tatoeba2anki serves as an intermediate tool between the sentences
		translated by the volunteer contributors of the tatoeba community and
		spaced repetition tools.
	</p>

	<Form on:translations={handleTranslations} />
	{#await handleTranslations}
		<Spinner />
	{:then}
		<TranslationTable {translatedSentences} />
	{/await}
</main>

<style>
	h1 {
		font-family: "EB Garamond", "Optima", sans-serif;
	}
	main {
		max-width: 640px;
		margin: 0 auto;
	}
</style>
