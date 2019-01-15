import _get from "lodash.get";
import _remove from "lodash.remove";
import _update from "lodash.update";
import {
  FETCH_KEYWORD_QUERY,
  FETCH_KEYWORDS_QUERY,
  GET_SELECTED_KEYWORD_QUERY
} from "~/modules/KeywordsView/apollo/gql";

export const updateKeywordsList = (cache, updatedKeyword) => {
  const fetchKeywordsQuery = {
    query: FETCH_KEYWORDS_QUERY
  };

  let keywordsData = cache.readQuery(fetchKeywordsQuery);

  keywordsData = {
    ...keywordsData,
    dictionaries: [..._get(keywordsData, "dictionaries", []), updatedKeyword]
  };

  cache.writeQuery({
    ...fetchKeywordsQuery,
    data: keywordsData
  });
};

export const updateKeywordCache = (cache, updatedKeyword) => {
  const fetchKeywordQuery = {
    query: FETCH_KEYWORD_QUERY,
    variables: {
      keywordId: updatedKeyword.id
    }
  };

  cache.writeQuery({
    ...fetchKeywordQuery,
    data: _update({}, ["dictionary"], () => updatedKeyword)
  });
};

export const updateSelectedKeywordCache = (cache, updatedKeyword) => {
  const fetchSelectedKeywordQuery = {
    query: GET_SELECTED_KEYWORD_QUERY
  };

  const data = cache.readQuery(fetchSelectedKeywordQuery);

  cache.writeQuery({
    ...fetchSelectedKeywordQuery,
    data: _update(data, ["selectedKeyword"], function(i) {
      return {
        ...i,
        id: updatedKeyword ? updatedKeyword.id : null,
        name: updatedKeyword ? updatedKeyword.name : null
      };
    })
  });
};

export const deleteKeywordFromCache = (cache, keywordToDelete) => {
  const fetchKeywordsQuery = {
    query: FETCH_KEYWORDS_QUERY
  };

  const keywordsData = cache.readQuery(fetchKeywordsQuery);

  if (keywordsData) {
    const filteredData = _remove(
      _get(keywordsData, ["dictionaries"], []),
      i => _get(i, ["id"], "") !== keywordToDelete.id
    );

    const updatedData = _update(
      keywordsData,
      ["dictionaries"],
      () => filteredData
    );

    cache.writeQuery({
      ...fetchKeywordsQuery,
      data: updatedData
    });
  }
};
