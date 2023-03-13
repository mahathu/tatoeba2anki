<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { TranslatedSentence } from "./TranslatedSentence.js";
    let lang_from = "deu";
    let lang_to = "tur";
    let find_similar = true;

    let placeholder_words = ["wegen"]; //["yürüyerek"]; //, "benim", "seni", "git"];
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
        // Split the text input by lines
        let phrases = textInput.split(/\r?\n/);

        // Remove all characters that aren't letters or whitespace, and filter empty lines:
        phrases = phrases
            .map((p) => p.replace(/[^\p{L}\s]|_/gu, "").trim())
            .filter(Boolean);

        let translations = [];
        for (let phrase of phrases) {
            const search_results = await getSentencesForPhrase(
                phrase,
                lang_from,
                lang_to,
                find_similar
            );
            translations.push(...search_results);
        }
        console.log(translations);
        dispatch("translations", translations);
    }

    /* TODO: move this into an external function */
    async function getSentencesForPhrase(
        query,
        lang_from,
        lang_to,
        find_similar
    ) {
        const URL_PARAMS = new URLSearchParams({
            query: query,
            lang_from: lang_from,
            lang_to: lang_to,
            find_similar: find_similar,
        });

        const API_URL = `./api/v0/translations?${URL_PARAMS.toString()}`;

        let response = await fetch(API_URL);
        response = await response.json();

        let translations = response.map((r) => {
            return new TranslatedSentence(
                query,
                lang_from,
                lang_to,
                r.author,
                r.original,
                r.translations
            );
        });

        return translations;
    }
</script>

<form class="form-wrapper" on:submit|preventDefault={handleSubmit}>
    <div class="form-l">
        <!-- TODO: turn the language inputs into autocomplete/typeahead
    fields: https://github.com/pstanoev/simple-svelte-autocomplete -->
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
        <label>
            <input type="checkbox" bind:checked={find_similar} />
            Find similar words by
            <a href="https://en.wikipedia.org/wiki/Stemming">stemming</a> search
            terms
        </label>

        <button type="submit">Click me.</button>
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
