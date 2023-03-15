<script>
    import { createEventDispatcher } from "svelte";
    import TranslationTableRow from "./TranslationTableRow.svelte";

    export let translatedSentences, currentlyFetching;
    $: nSelectedSentences = translatedSentences.filter(
        (s) => s.selected
    ).length;

    let allSentencesSelected = true;

    const dispatch = createEventDispatcher();

    function toggleAll() {
        allSentencesSelected = !allSentencesSelected;
        translatedSentences.forEach((sentence) => {
            sentence.selected = allSentencesSelected;
        });
        translatedSentences = translatedSentences; // Trigger reactivity
    }
</script>

<!-- TODO:
	list phrases that had no (red) or fewer than requested (yellow)
	translations in the requested language pairs.
	-->

{#if translatedSentences.length > 0}
    <div class="translation-table-actions">
        <span>
            {translatedSentences.length} results found
            {#if nSelectedSentences < translatedSentences.length}({nSelectedSentences}
                selected)
            {/if}
        </span>
        {#if currentlyFetching}
            <button
                class="clear danger"
                on:click={(e) => {
                    dispatch("stopFetching");
                }}>stop fetching</button
            >
        {/if}
        <button class="clear" on:click={toggleAll}
            >{allSentencesSelected ? "un" : ""}select all</button
        >
    </div>
    <table>
        <tr>
            <th><!--✅--></th>
            <th>Original author</th>
            <th>Sentence</th>
            <th>Translation</th>
        </tr>
        {#each translatedSentences as sentence}
            <TranslationTableRow
                {sentence}
                on:updateSentenceArray={(e) => {
                    translatedSentences = translatedSentences;
                }}
            />
        {/each}
    </table>
{/if}

<style>
    table {
        border-spacing: 1px 2px;
        width: 100%;
        margin-bottom: 1em;
    }
    .translation-table-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5em;
    }
</style>
