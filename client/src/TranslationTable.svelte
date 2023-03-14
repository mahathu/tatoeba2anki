<script>
    export let translatedSentences, currentlyFetching;
    $: nSelectedSentences = translatedSentences.filter(
        (s) => s.selected
    ).length;
    /* TODO: nSelectedSentences needs to be refreshed when
    a sentence is (un)selected -> maybe through a dispatch? */

    import { createEventDispatcher } from "svelte";
    import TranslationTableRow from "./TranslationTableRow.svelte";

    let allSentencesSelected = true;

    const dispatch = createEventDispatcher();

    function stopFetching() {
        dispatch("stopFetching");
    }

    function toggleSelection() {
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
            {translatedSentences.length} results found {nSelectedSentences}
            {#if nSelectedSentences < translatedSentences.length}({nSelectedSentences}
                selected)
            {/if}
        </span>
        {#if currentlyFetching}
            <button class="clear danger" on:click={stopFetching}
                >stop fetching</button
            >
        {/if}
        <button class="clear" on:click={toggleSelection}
            >{allSentencesSelected ? "un" : ""}select all</button
        >
    </div>
    <table>
        <tr>
            <th>Original author</th>
            <th>Sentence</th>
            <th>Translation</th>
            <th><!--✅--></th>
        </tr>
        {#each translatedSentences as sentence, i}
            <TranslationTableRow {sentence} {i} />
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
