<script>
    import { createEventDispatcher } from "svelte";

    export let sentence;

    const dispatch = createEventDispatcher();

    function handleClick(event) {
        sentence.selected = !sentence.selected;
        dispatch("updateSentenceArray");
    }
</script>

<tr class={sentence.selected ? "" : "deactivated"} on:click={handleClick}>
    <td>
        <input type="checkbox" checked={sentence.selected} />
    </td>
    <td
        ><a
            href="https://tatoeba.org/en/user/profile/{sentence.author}"
            target="_blank"
            rel="noreferrer"
            on:click|stopPropagation>{sentence.author}</a
        ></td
    >
    <td>{sentence.original_sentence}</td>

    {#if sentence.translations.length > 1}
        <td class="contains-select">
            <select id="translation-select-{i}" on:click|stopPropagation>
                {#each sentence.translations as translationChoice}
                    <option value={translationChoice}
                        >{translationChoice}</option
                    >
                {/each}
            </select>
        </td>
    {:else}
        <td>{sentence.translations[0]}</td>
    {/if}
</tr>

<style>
    tr {
        transition: background-color 75ms ease;
        cursor: pointer;
    }
    tr:nth-child(even) {
        background-color: hsl(0, 0%, 95%);
    }

    tr:hover {
        /* 5% darker */
        background-color: hsl(0, 0%, 89%);
    }

    tr.deactivated {
        color: rgba(51, 51, 51, 0.75);
    }

    td:not(:first-child) {
        padding: 4px 7px;
    }

    td:first-child {
        text-align: center;
        vertical-align: middle;
        padding: 0 6px;
    }

    td input[type="checkbox"] {
        --checkbox-size: 1.25em;
        width: var(--checkbox-size);
        height: var(--checkbox-size);
    }

    td select {
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        width: 100%;
        cursor: pointer;
        border-radius: 0;
        border-bottom: 1px solid hsla(0, 0%, 0%, 0.2);
    }

    td.contains-select {
        padding-left: 3px;
        padding-bottom: 3px; /* 1px less to account for the border */
    }

    td input[type="checkbox"] {
        vertical-align: middle;
        margin: 0;
    }
</style>
