import requests


# TODO switch from API to using their database export
# TODO add toggle for direct translations only
def get_translations(
    query, lang_from, lang_to, find_similar, max_results=10, max_sentence_len=60
):
    page = 1
    translations = []
    next_page_exists = True

    while next_page_exists:
        if not find_similar:
            query = f"={query}"

        json = search_tatoeba(query, lang_from, lang_to, page)
        next_page_exists = json["paging"]["Sentences"]["nextPage"]
        page += 1

        sentences = [s for s in json["results"] if len(s["text"]) <= max_sentence_len]

        for sentence in sentences:
            sentence_translations = get_translations_for_sentence(sentence, lang_to)

            if not sentence_translations:
                # TODO: this happens a lot for common words translated into uncommon languages,
                # needs urgent fixing i.e. change API to only return sentences with translations
                print(f"no translation for {sentence['text']} in {lang_to}")
                continue

            translations.append(
                {
                    "author": sentence["user"]["username"],
                    "original": sentence["text"],
                    "translation": sentence_translations[0]["text"],
                }
            )

            if len(translations) >= max_results:
                return translations

    return translations


def search_tatoeba(query, lang_from, lang_to, page):
    BASE_URL = "https://tatoeba.org/en/api_v0/search"
    BASE_PARAMS = {
        "query": query,
        "from": lang_from,
        "trans_to": lang_to,
        "sort": "relevance",
        "orphans": "no",
        "trans_filter": "limit",
        "trans_link": "direct",
        "trans_unapproved": "no",
        "unapproved": "no",
        "page": page,
    }
    response = requests.get(BASE_URL, params=BASE_PARAMS)
    return response.json()


def get_translations_for_sentence(sentence, lang_to):
    return [
        translation
        for translation_list in sentence["translations"]
        for translation in translation_list
        if translation["lang"] == lang_to  # and "isDirect" in translation
    ]
