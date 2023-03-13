<script>
    export let sentence;
    export let i;
</script>

<tr
    class={sentence.selected ? "" : "deactivated"}
    on:click={(e) => {
        sentence.selected = !sentence.selected;
    }}
>
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

    <td>
        <input type="checkbox" id="t-{i}" bind:checked={sentence.selected} />
    </td>
</tr>

<style>
    tr {
        transition: background-color 75ms ease;
        background-color: hsl(0, 0%, 99%);
        cursor: pointer;
    }
    tr:nth-child(even) {
        background-color: hsl(0, 0%, 94%);
    }

    tr:hover {
        /* 5% darker */
        background-color: hsl(0, 0%, 89%);
    }

    tr.deactivated {
        opacity: 0.125;
    }

    td:not(:last-child) {
        padding: 4px 7px;
    }

    td:last-child {
        text-align: center;
        vertical-align: middle;
        padding: 0 2px;
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
