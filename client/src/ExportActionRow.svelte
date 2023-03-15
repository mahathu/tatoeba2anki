<script>
    let prefixEnabled = true;
    let prefix = "🌐";

    function generateCSV(sentences) {
        let date = new Date().toISOString().split("T")[0];
        let out_file_name = `tatoeba2anki_export_${date}.csv`;
        let csvString = `author,${sentences[0].lang_from},${sentences[0].lang_to}\n`;
        sentences
            .filter((s) => s.selected)
            .forEach((sentence) => {
                csvString += sentence.getCSVRow();
            });
        console.log(csvString);
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = out_file_name;
        link.click();
    }

    export let translatedSentences;
    $: nSelectedSentences = translatedSentences.filter(
        (s) => s.selected
    ).length;
</script>

<div class="action-row flex">
    <div class="flex prefix-wrapper {prefixEnabled ? '' : 'disabled'}">
        <label>
            <input type="checkbox" bind:checked={prefixEnabled} />
            <span>Add prefix:</span>
        </label>
        <input type="text" value={prefix} class="prefix-input" />
    </div>
    <div>
        <button disabled={nSelectedSentences == 0}>Download as .apkg</button>
        <button on:click={generateCSV(translatedSentences)}
            >Export as .csv</button
        >
    </div>
</div>

<style>
    .action-row {
        justify-content: space-between;
        margin-bottom: 1.5em;
    }

    .action-row button {
        margin: 0;
    }

    .prefix-wrapper {
        align-items: center;
    }

    .prefix-wrapper label {
        padding: 0;
    }

    .prefix-wrapper input[type="checkbox"] {
        margin: 0;
    }

    .prefix-input {
        width: 2em;
        padding: 2px 4px;
        margin: 0 0 0 0.75em;
    }
</style>
