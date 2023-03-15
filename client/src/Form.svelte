<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { getSentencesForPhrase, getQueriesFromString } from "./util";

    export let currentlyFetching;

    let lang_from = "tur";
    let lang_to = "deu";
    let find_similar = true;

    let placeholder_words = ["yürüyerek"];
    let textInput = placeholder_words.join("\n");

    let langs = [
        { code: "eng", name: "English" },
        { code: "deu", name: "German" },
        { code: "fra", name: "French" },
        { code: "ita", name: "Italian" },
        { code: "spa", name: "Spanish" },
        { code: "por", name: "Portuguese" },
        { code: "rus", name: "Russian" },
        { code: "jpn", name: "Japanese" },
        { code: "kor", name: "Korean" },
        { code: "tur", name: "Turkish" },
        { code: "pes", name: "Persian" },
    ];

    /* only for faster prototyping: */
    onMount(handleSubmit);

    const dispatch = createEventDispatcher();

    async function handleSubmit() {
        dispatch("startedFetching");
        currentlyFetching = true;

        // Split the text input by lines
        let phrases = getQueriesFromString(textInput);

        for (let phrase of phrases) {
            const search_results = await getSentencesForPhrase(
                phrase,
                lang_from,
                lang_to,
                find_similar
            );

            if (!currentlyFetching) {
                return;
            }

            dispatch("translations", search_results);
        }

        dispatch("doneFetching");
    }
</script>

<form class="form-wrapper" on:submit|preventDefault={handleSubmit}>
    <div class="form-l">
        <label for="langFromSelect"><br />Source language:</label>
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
        <label class="flex find-similar-label">
            <input type="checkbox" bind:checked={find_similar} />
            <span
                >Find similar words by
                <a href="https://en.wikipedia.org/wiki/Stemming">stemming</a> search
                terms</span
            >
        </label>

        <button type="submit" disabled={currentlyFetching}
            >Find example sentences</button
        >
    </div>
    <div class="form-r">
        <label for="knownWordsInput"
            >Enter words in the source language (one word or phrase per line):</label
        >
        <textarea
            id="knownWordsInput"
            name="knownWordsInput"
            bind:value={textInput}
        />
    </div>
</form>

<style>
    textarea,
    button,
    select {
        width: 100%;
    }
    .form-wrapper {
        display: flex;
        gap: 1.8em;
    }
    .form-l {
        flex: 4;
    }
    .form-r {
        flex: 6;
        display: flex;
        flex-direction: column;
    }
    .form-r textarea {
        flex-grow: 1;
    }

    .find-similar-label input[type="checkbox"] {
        margin-right: 0.5em;
    }

    @media screen and (max-width: 500px) {
        form {
            /* background: lightskyblue; */
            flex-direction: column-reverse;
        }
        textarea {
            height: 8em;
        }
    }
</style>
