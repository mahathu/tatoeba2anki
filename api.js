async function getTranslations(query, translate_from, translate_to, max_sentences = 5) {
    /**
     * Get a list of example sentences for a given query.
     * @param {String} query The query to search for.
     * @param {String} translate_from The language of the query used.
     * @param {String} translate_to The language of the desired translations.
     * @param {Number} max_sentences The maximum number of sentences to return.
     */

    const MAX_SENTENCE_LEN = 60;
    const BASE_URL = "https://tatoeba.org/en/api_v0/search";
    const BASE_PARAMS = {
        "from": translate_from,
        "trans_to": translate_to,
        "query": query,
        "sort": "relevance",
        "orphans": "no",
        "trans_filter": "limit",
        "trans_link": "direct",
        "trans_unapproved": "no",
        "unapproved": "no",
    };

    let page = 1;
    let sentence_pairs = [];
    let next_page_exists = true;

    while (next_page_exists) {
        console.info(`fetching page ${page} for query "${query}"...`);

        let params = new URLSearchParams({ ...BASE_PARAMS, page: page++ });
        let target_url = `${BASE_URL}?${params.toString()}`;

        let response = await fetch(target_url)
        let json = await response.json()

        next_page_exists = json.paging.Sentences.nextPage;

        for (let sentence of json.results.filter(
            sentence => sentence.text.length <= MAX_SENTENCE_LEN
        )) {
            /* There may be multiple translations of the sentence into
            the desired language. We just pick the first one. */
            let translations = sentence.translations.flat().filter(
                translation => (
                    translation.lang == translate_to &&
                    translation.isDirect
                )
            );

            if (!translations.length) {
                console.warn(`no translation for ${r.text} in ${lang_to}`);
                continue;
            }

            /* TODO:
            instead of passing cloze here, there should be some object
            server side that can be used to generate the cloze as well
            as appropriate html for the live preview functionality.
            - cloze muss auch case insensitive funktionieren
            - add stemmer für endungen
            */
            sentence_pairs.push({
                'author': sentence.user.username,
                'sentence': sentence.text,
                'translation': translations[0].text,
                'cloze': sentence.text.replace(query, `{{c1::${query}}}`)
            })

            if (sentence_pairs.length >= max_sentences) {
                console.info(`Reached max sentences (${max_sentences}).`);
                return sentence_pairs;
            }
        }
    }

    return sentence_pairs;
}

async function main() {
    let pairs = await getTranslations('araba', 'tur', 'deu');
    console.log(pairs)
}

main();