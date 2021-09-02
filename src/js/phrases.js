if (document.querySelector(".phrases-page")) {
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

  // ====> Add Phrase
  function addPhrase() {
    let phrase = document.querySelector(".form-add-phrase .phrase");
    let translate = document.querySelector(".form-add-phrase .translate");
    let sound = document.querySelector(".form-add-phrase .sound");
    let lang = document.querySelector(".form-add-phrase .check-language");
    let list = document.querySelector(".form-add-phrase .check-list");
    // Check is input valid
    if (
      phrase.value !== "" &&
      translate.value !== "" &&
      lang.value !== "" &&
      list.value !== ""
    ) {
      let newPhrase = {
        id: serialNumber(phrase.value),
        phrase: phrase.value,
        translate: translate.value,
        sound: sound.value,
        lang_id: lang.value,
        list_id: list.value,
        status: false,
        date: new Date().toLocaleDateString(),
      };

      phrases.push(newPhrase);
      // Save new data is localStorage
      store.savePhrases(phrases);
      // Reset inputs value
      phrase.value = "";
      translate.value = "";
      sound.value = "";
      document.querySelector(".phrases").append(createPhrase(newPhrase));
      displayResultPhrases();
      // check & append element in words
    }
  }
  // phrase Content
  function displayPhrases(filters = phrases) {
    if (filters.length) {
      document.querySelector(".phrases-page .phrases").innerHTML = "";
      for (let phrase of filters.reverse()) {
        document
          .querySelector(".phrases-page .phrases")
          .append(createPhrase(phrase));
      }
    } else
      document.querySelector(".phrases-page .phrases").innerHTML =
        '<div class="empty"><i class="fa fa-ban"></i> Theres no phrases</div>';
  }
  displayPhrases(); // run on page loaded

  // Delete Phrase
  function deletePhrase(element) {
    element.parentElement.parentElement.parentElement.style.display = "none";
    let newPhrases = phrases.filter(
      (phrase) => phrase.id !== element.dataset.id
    );
    store.savePhrases(newPhrases);
  }

  // Filters word
  function filterPhrasesByList(element) {
    activeElementInList(element);
    let { list_id, lang_id } = element.dataset;
    if (list_id == "All") {
      let phrasesFilter = phrases.filter(
        (phrase) => phrase.lang_id === lang_id
      );
      displayPhrases(phrasesFilter);
    } else {
      let phrasesFilter = phrases.filter(
        (phrase) => phrase.lang_id === lang_id && phrase.list_id == list_id
      );
      displayPhrases(phrasesFilter);
    }
  }
  function filterPhrasesByLang(element) {
    activeElementInList(element);
    let { lang_id } = element.dataset;
    if (lang_id == "All") {
      displayPhrases(phrases);
      document.querySelector(".filter-list").style.display = "none";
    } else {
      let phrasesFilter = phrases.filter(
        (phrase) => phrase.lang_id === lang_id
      );
      document.querySelector(".filter-list").style.display = "block";
      displayPhrases(phrasesFilter);
      let listOfLang = "";
      for (let list of getListOfLang(lang_id)) {
        listOfLang += `<button data-lang_id="${list.lang_id}" data-list_id="${
          list.id
        }" onclick="filterPhrasesByList(this)">${list.list} <span>${
          getPhraseOfList(list.id).length
        }</span> </button>`;
      }
      document.querySelector(
        ".phrases-page .filter-list"
      ).innerHTML = listOfLang
        ? `Lists: <button data-lang_id="${lang_id}" data-list_id="All" class="active" onclick="filterPhrasesByList(this)">All <span>${
            getPhraseOfLang(lang_id).length
          }</span> </button> ${listOfLang}`
        : "";
    }
  }
  let langs = "";
  for (let language of languages) {
    langs += `|<button data-lang_id="${
      language.id
    }" onclick="filterPhrasesByLang(this)" >${language.lang} <span>${
      getPhraseOfLang(language.id).length
    }</span> </button>`;
  }
  document.querySelector(".phrases-page .filters .filter-lang").innerHTML =
    langs &&
    ` Filter:<button class="active" data-lang_id="All" onclick="filterPhrasesByLang(this)">All <span>${phrases.length}</span> </button>` +
      langs;
}
