import requests


# TODO switch from API to using their database export
# TODO add toggle for direct translations only
# TODO: instead of hardcoding the function arguments, use **kwargs and just pass everything to tatoeba
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

            # this shouldn't happen if the API only returns sentences that
            # have translations in the target language
            if not sentence_translations:
                raise RuntimeError(
                    f"no translation for {sentence['text']} in {lang_to}"
                )

            translations.append(
                {
                    "author": sentence["user"]["username"],
                    "original": sentence["text"],
                    "translations": sentence_translations,
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
        "to": lang_to,
        "sort": "relevance",
        "orphans": "no",
        "trans_filter": "limit",
        # "trans_link": "direct",
        "trans_unapproved": "no",
        "unapproved": "no",
        "page": page,
    }
    response = requests.get(BASE_URL, params=BASE_PARAMS)
    print(response.url)
    return response.json()


def get_translations_for_sentence(sentence, lang_to):
    return [
        translation["text"]
        for translation_list in sentence["translations"]
        for translation in translation_list
        if translation["lang"] == lang_to  # and "isDirect" in translation
    ]
