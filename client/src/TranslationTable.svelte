<script>
    export let translatedSentences;

    import TranslationTableRow from "./TranslationTableRow.svelte";

    let toggleCheckAllButtonLabel = "unselect all";
    // TODO: this does not work
    // function toggleCheckAll() {
    //     translatedSentences.forEach((sentence) => {
    //         sentence.isIncludedInBundle = false;
    //         sentence = sentence;
    //     });
    //     // toggleCheckAllButtonLabel = "unselect all";
    // }
</script>

<!-- TODO:
	list phrases that had no (red) or fewer than requested (yellow)
	translations in the requested language pairs.
	-->

{#if translatedSentences.length > 0}
    <div class="table-buttons">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <!-- <a href="#" on:click={toggleCheckAll}>{toggleCheckAllButtonLabel}</a> -->
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
{:else}
    No translations.
{/if}

<style>
    table {
        border-spacing: 1px 2px;
        width: 100%;
    }
    .table-buttons {
        display: flex;
        justify-content: flex-end;
    }
</style>
