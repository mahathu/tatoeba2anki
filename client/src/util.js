export async function getSentencesForPhrase(
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

export function getQueriesFromString(s) {
    // Remove all characters that aren't letters or whitespace, and filter empty lines:
    return s
        .split(/\r?\n/)
        .map(
            (p) => p.replace(/[^\p{L}\s]|_/gu, "").trim()
        )
        .filter(Boolean);
}

export class TranslatedSentence {
    query;
    lang_from;
    lang_to;
    author;
    original_sentence;
    translations;
    selected;

    constructor(query, lang_from, lang_to, author, original_sentence, translations) {
        this.query = query;
        this.lang_from = lang_from;
        this.lang_to = lang_to;
        this.author = author;
        this.original_sentence = original_sentence;
        this.translations = translations;

        this.selected = true;

        console.log(`Created TranslatedSentence: ${this}`);
    }

    // function stub:
    getCloze(direction = "regular") {
        const underscores = "_".repeat(query.length);
        return this.original_sentence.replace(query, underscores);
    }

    getCSVRow(sep = ',') {
        //TODO: add a property that selects which translation is chosen by the dropdown
        // for sentences that have multiple translations
        const columns = [this.author, this.original_sentence, this.translations[0]];
        return columns.map(c => `"${c}"`).join(sep) + '\n';
    }
}