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
}