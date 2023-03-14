<script>
	import Form from "./Form.svelte";
	import TranslationTable from "./TranslationTable.svelte";
	import Spinner from "./Spinner.svelte";
	import ExportActionRow from "./ExportActionRow.svelte";

	let currentlyFetching = false;
	let translatedSentences = [];

	function appendTranslations(event) {
		let newTranslations = event.detail;
		translatedSentences = [...translatedSentences, ...newTranslations];
	}
</script>

<main>
	<h1>tatoeba2anki</h1>
	<p>
		tatoeba2anki serves as an intermediate tool between the sentences
		translated by the volunteer contributors of the tatoeba community and
		spaced repetition tools.
	</p>

	<Form
		on:startedFetching={(e) => {
			currentlyFetching = true;
			translatedSentences = [];
		}}
		on:translations={appendTranslations}
		on:doneFetching={(e) => {
			currentlyFetching = false;
		}}
		{currentlyFetching}
	/>

	{#if translatedSentences.length > 0}
		<TranslationTable
			{translatedSentences}
			{currentlyFetching}
			on:stopFetching={(e) => {
				currentlyFetching = false;
			}}
		/>
	{/if}

	{#if currentlyFetching}
		<Spinner />
	{/if}

	{#if translatedSentences.length > 0 && !currentlyFetching}
		<ExportActionRow {translatedSentences} />
	{/if}
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
