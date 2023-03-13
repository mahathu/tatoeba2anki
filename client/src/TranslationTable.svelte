<script>
    export let translatedSentences;

    import TranslationTableRow from "./TranslationTableRow.svelte";

    let allSentencesSelected = true;

    function toggleSelection() {
        allSentencesSelected = !allSentencesSelected;
        console.log("toggleselct called");
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
        <button class="clear" on:click={toggleSelection}
            >{allSentencesSelected ? "un" : ""}select all</button
        >
    </div>
    <table>
        <tr>
            <!-- svelte-ignore a11y-missing-attribute -->
            <th>Original author <a>(hide)</a></th>
            <th>Sentence</th>
            <th>Translation</th>
            <th><!--✅--></th>
        </tr>
        {#each translatedSentences as sentence, i}
            <TranslationTableRow {sentence} {i} />
        {/each}
    </table>
{:else}
    No translations.
{/if}

<style>
    table {
        border-spacing: 1px 2px;
        width: 100%;
    }
    .translation-table-actions {
        display: flex;
        justify-content: flex-end;
    }
</style>
