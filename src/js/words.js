if (document.querySelector(".words-page")) {
  // ====> Add word
  function addWord() {
    let word = document.querySelector(".form-add-word .word");
    let translation = document.querySelector(".form-add-word .translation");
    let lang = document.querySelector(".form-add-word .check-language");
    let list = document.querySelector(".form-add-word .check-list");
    // Check is input valid
    if (
      word.value !== "" &&
      translation.value !== "" &&
      lang.value !== "" &&
      list.value !== ""
    ) {
      let newWord = {
        id: serialNumber(word.value),
        word: word.value,
        translation: translation.value,
        lang_id: lang.value,
        list_id: list.value,
        status: false,
        date: new Date().toLocaleDateString(),
      };
      words.push(newWord);
      // Save new data is localStorage
      store.saveWords(words);
      // Reset inputs value
      word.value = "";
      translation.value = "";
      document.querySelector(".words").append(createWord(newWord));
    }
  }
  // Delete Words
  function deleteWord(element) {
    document.getElementById(element.dataset.id).style.display = "none";
    let newWords = words.filter((word) => word.id !== element.dataset.id);
    store.saveWords(newWords);
  }
  // Create Word
  function createWord(word) {
    let wordContainer = document.createElement("div");
    let wordLang = getLangById(word.lang_id);
    let wordList = getListById(word.list_id);
    wordContainer.innerHTML = `
      <div  class="word-box" 
            id=${word.id} 
            style="border-top-color:${wordLang.color}">
        <a  href="#" 
            class="word-lang" 
            style="background:${wordLang.color}">
            ${wordLang.lang.slice(0, 2)}
        </a>
        <i  class="fa fa-bookmark 
            ${word.status && "active"}"
            onclick="changeStatus(this)" 
            data-type="word" data-id="${word.id}">
        </i>
        <h3 style="color:${wordLang.color}">${word.word}</h3>
        <small>${word.translation}</small>
        <i  class="fa fa-volume-up" 
            data-lang_id="${wordLang.id}" 
            data-content="${word.word}" 
            onclick="textToSpeash(this)">
        </i>
        <div class="word-footer">
          <a href="filters.html?flang=${wordLang.id}&flist=${wordList.id}">
            <i class="fa fa-tag fa-fw"></i> 
            ${wordList.list}
            </a>
          <span  data-id="${word.id}" onclick="deleteWord(this)" >
            <i class="fa fa-times"></i>
          </span>
        </div>
      </div>
    `;
    return wordContainer;
  }
  // words Content
  // document.querySelector('.count-of-words').textContent =
  function displayWords(filters = words) {
    if (filters.length) {
      document.querySelector(".words-page .words").innerHTML = "";
      for (let word of filters.reverse()) {
        document
          .querySelector(".words-page .words")
          .appendChild(createWord(word));
      }
    } else
      document.querySelector(".words-page .words").innerHTML =
        '<div class="empty"><i class="fa fa-ban"></i> Theres no words</div>';
  }
  displayWords(); // run on page loaded

  // Delete word
  document.querySelectorAll(".word-footer .fa-times").forEach((item) => {
    item.addEventListener("click", (element) => {
      let { id } = element.target.dataset;
      document.getElementById(id).style.display = "none";
      let newWords = words.filter((word) => word.id !== id);
      store.saveWords(newWords);
    });
  });

  // Filters word
  function filterWordsByList(element) {
    activeElementInList(element);
    let { list_id, lang_id } = element.dataset;
    if (list_id == "All") {
      let wordsFilter = words.filter((word) => word.lang_id === lang_id);
      displayWords(wordsFilter);
    } else {
      let wordsFilter = words.filter(
        (word) => word.lang_id === lang_id && word.list_id === list_id
      );
      displayWords(wordsFilter);
    }
  }
  function filterWordsByLang(element) {
    activeElementInList(element);
    let { lang_id } = element.dataset;
    if (lang_id == "All") {
      displayWords(words);
      document.querySelector(".filter-list").style.display = "none";
    } else {
      let wordsFilter = words.filter((word) => word.lang_id === lang_id);
      document.querySelector(".filter-list").style.display = "block";
      displayWords(wordsFilter);
      let listOfLang = "";
      for (let list of getListOfLang(lang_id)) {
        listOfLang += `<button data-lang_id="${lang_id}" data-list_id="${
          list.id
        }" onclick="filterWordsByList(this)">${list.list} <span>${
          getWordOfList(list.id).length
        }</span> </button>`;
      }
      document.querySelector(".words-page .filter-list").innerHTML = listOfLang
        ? `Lists: <button data-lang_id="${lang_id}" data-list_id="All" class="active" onclick="filterWordsByList(this)">All <span>${
            getWordOfLang(lang_id).length
          }</span> </button> ${listOfLang}`
        : "";
    }
  }
  let langs = "";
  for (let language of languages) {
    langs += `|<button data-lang_id="${
      language.id
    }" onclick="filterWordsByLang(this)" >${language.lang} <span>${
      getWordOfLang(language.id).length
    }</span> </button>`;
  }
  document.querySelector(".words-page .filters .filter-lang").innerHTML =
    langs &&
    ` Filter:<button class="active" data-lang_id="All" onclick="filterWordsByLang(this)">All <span>${words.length}</span>  </button>` +
      langs;
}
// Create Word
function createWord(word) {
  let wordContainer = document.createElement("div");
  let wordLang = getLangById(word.lang_id);
  let wordList = getListById(word.list_id);
  wordContainer.innerHTML = `
    <div  class="word-box" 
          id=${word.id} 
          style="border-top-color:${wordLang.color}">
      <a  href="#" 
          class="word-lang" 
          style="background:${wordLang.color}">
          ${wordLang.lang.slice(0, 2)}
      </a>
      <i  class="fa fa-bookmark 
          ${word.status && "active"}"
          onclick="changeStatus(this)" 
          data-type="word" data-id="${word.id}">
      </i>
      <h3 style="color:${wordLang.color}">${word.word}</h3>
      <small>${word.translation}</small>
      <i  class="fa fa-volume-up" 
          data-lang_id="${wordLang.id}" 
          data-content="${word.word}" 
          onclick="textToSpeash(this)">
      </i>
      <div class="word-footer">
        <a href="filters.html?flang=${wordLang.id}&flist=${wordList.id}">
          <i class="fa fa-tag fa-fw"></i> 
          ${wordList.list}
          </a>
        <span  data-id="${word.id}" onclick="deleteWord(this)" >
          <i class="fa fa-times"></i>
        </span>
      </div>
    </div>
  `;
  return wordContainer;
}
if(document.querySelector('.bookmarks')){

  
  
  function displayBookmarks(){
    // CreatePhrase
  function createPhrase(phrase) {
    let phraseLang = getLangById(phrase.lang_id);
    console.log(phraseLang);
    let phraseContainer = document.createElement("div");
    phraseContainer.innerHTML = `
      <div class="phrase-box" 
           id=${phrase.id}
           style="border-color:${phraseLang.color}">
        <h3 style="color:${phraseLang.color}">
          ${phrase.phrase.trim()}
         </h3>
        ${phrase.sound && `<p>${phrase.sound}</p>`}
        <small>${phrase.translate}</small>
        <div class="phrase-footer">
          <i  class="fa fa-volume-up" 
              data-lang_id="${phraseLang.id}" 
              data-content="${phrase.phrase}" 
              onclick="textToSpeash(this)">
          </i>
          <span class="phrase-save">
            <i  class="fa fa-bookmark  
                ${phrase.status && "active"} "
                onclick="changeStatus(this)" 
                data-type="phrase" 
                data-id="${phrase.id}">
            </i>
          </span>
          <span>
            <i  class="fa fa-times" 
              data-id="${phrase.id}" 
              onclick="deletePhrase(this)">
            </i>
          </span>
        </div>
      </div>
    `;
    return phraseContainer;
  }
    let bookmarkPhrases = phrases.filter(phrase => phrase.status === true)
    let bookmarkWords = words.filter(word => word.status === true)
    for(let word of bookmarkWords )
      document.querySelector('.bookmarks .words').append(createWord(word))
    for(let phrase of bookmarkPhrases )
      document.querySelector('.bookmarks .phrases').append(createPhrase(phrase))
  }
  displayBookmarks()
}