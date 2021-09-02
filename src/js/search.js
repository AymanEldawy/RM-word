// Search
function formSearch(e) {
  let input = document.querySelector(".form-search input");
  e.target.action += `?q=${input.value}`;
}
document.querySelector(".form-search").onsubmit = formSearch;
if (document.querySelector(".search-content")) {
  function search(q) {
    
    let content = document.querySelector(".search-content");
    let wordSearch = words.filter(
      (word) =>
        word.word.indexOf(q) !== -1 || word.translation.indexOf(q) !== -1
    );
    let phraseSearch = phrases.filter(
      (phrase) =>
        phrase.phrase.indexOf(q) !== -1 || phrase.translate.indexOf(q) !== -1
    );
    let biggerList =
      wordSearch.length > phraseSearch.length ? wordSearch : phraseSearch;
    for (let index in biggerList) {
      if (phraseSearch[index]) {
        content.append(createPhraseContent(phraseSearch[index]));
      }
      if (wordSearch[index]) {
        content.append(createWordContent(wordSearch[index]));
      }
    }
    let resultContainer = document.createElement("p");
    resultContainer.innerHTML = `There are <span>${wordSearch.length + phraseSearch.length}</span> of Result `;
    document.querySelector(".search-page .container").prepend(resultContainer);
  }
  let query = location.search && location.search.split("=")[1];
  if (query) search(query);
  else
    document.querySelector(".search-content").innerHTML =
      '<div class="empty">There\'s no result </div>';
}
