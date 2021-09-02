// Display all Languages to choose one
function displayCheckLang() {
  let checkLanguage = document.querySelectorAll(".check-language");
  let content = "";
  for (let lang of store.fetchLang()) {
    content += `<option value="${lang.id}">${lang.lang}</option>`;
  }
  checkLanguage.forEach((item) => {
    item.innerHTML = content;
  });
  if (document.querySelector(".check-language"))
    displayCheckList(document.querySelector(".check-language").value);
}
// show list filter by language
function displayCheckList(value) {
  if (document.querySelector(".check-list")) {
    let filters = store.fetchList().filter((list) => {
      return list.lang_id == value;
    });
    let content = "";
    for (let list of filters) {
      content += `<option value="${list.id}">${list.list}</option>`;
    }
    document
      .querySelectorAll(".check-list")
      .forEach((item) => (item.innerHTML = content));
  }
}
displayCheckLang();
if (document.querySelector(".check-language")) {
  document.querySelectorAll(".check-language").forEach((item) => {
    item.addEventListener("change", (e) => displayCheckList(e.target.value));
  });
}
// change status = save or delete on bookmarks
function changeStatus(element) {
  let { type, id } = element.dataset;
  element.classList.toggle("active");
  let list = type === "word" ? words : phrases;
  for (let item of list) {
    if (item.id == id) {
      item.status = !item.status;
    }
  }
  type === "word" ? store.saveWords(list) : store.savePhrases(list);
}

// Display Result languages
if (document.querySelector(".dashboard-page")) {
  // Count phrases
  document.querySelector(
    ".phrase-count"
  ).innerHTML = `<a href="phrases.html"> ${phrases.length} Phrases </a>`;
  // Count words
  document.querySelector(
    ".word-count"
  ).innerHTML = `<a href="words.html"> ${words.length} Words </a>`;
  // Count Languages
  document.querySelector(
    ".lang-count"
  ).innerHTML = `<a href="languages.html"> ${languages.length} Languages </a>`;
  // Count lists
  document.querySelector(
    ".list-count"
  ).innerHTML = `<a href="lists.html"> ${lists.length} Lists </a>`;
  document.querySelector(
    ".alphabet-count"
  ).innerHTML = `<a href="alphabet.html"> ${alphabet.length} Alphabet </a>`;

  const displayResultLanguages = () => {
    let langContent = "";
    for (let language of languages) {
      langContent += `<span style="color: ${language.color}" >${language.lang}</span>`;
    }
    document.querySelector(
      ".langs-result .result-details"
    ).innerHTML = langContent;
  };
  const displayResultLists = () => {
    let listContent = "";
    for (let language of languages) {
      let listsOfLang = getListOfLang(language.id);
      if (listsOfLang.length) {
        listContent += `<span style="color: ${language.color}" >${language.lang} <span class="count">${listsOfLang.length}</span> </span>`;
      }
    }
    document.querySelector(
      ".lists-result .result-details"
    ).innerHTML = listContent;
  };
  // Display Result Words
  const displayResultWords = () => {
    let langContent = "";
    for (let language of languages) {
      let wordsOfLang = getWordOfLang(language.id);
      if (wordsOfLang.length) {
        langContent += `<span style="color: ${language.color}" >${language.lang} <span class="count">${wordsOfLang.length}</span> </span>`;
      }
    }
    document.querySelector(
      ".words-result .result-details"
    ).innerHTML = langContent;
  };
  // Display Result Phrase
  const displayResultPhrases = () => {
    let langContent = "";
    for (let language of languages) {
      let phraseOfLang = getPhraseOfLang(language.id);
      if (phraseOfLang.length) {
        langContent += `<span style="color: ${language.color}" >${language.lang} <span class="count">${phraseOfLang.length}</span> </span>`;
      }
    }
    document.querySelector(
      ".phrases-result .result-details"
    ).innerHTML = langContent;
  };
  // Display Result Alphabet
  const displayAlphabetPhrases = () => {
    let langContent = "";
    for (let language of languages) {
      let alphabetOfLang = getAlphabetOfLang(language.id);
      if (alphabetOfLang.length) {
        langContent += `<span style="color: ${language.color}" >${language.lang} <span class="count">${alphabetOfLang.length}</span> </span>`;
      }
    }
    document.querySelector(
      ".alphabet-result .result-details"
    ).innerHTML = langContent;
  };

  displayResultLanguages();
  displayResultLists();
  displayResultWords();
  displayResultPhrases();
  displayAlphabetPhrases();
}

function flashRandom() {
  console.log("Run");
  let flashChooser = Math.floor(Math.random() * 2) ? words : phrases;
  let flash = document.querySelector(".flash");
  if (flashChooser.length) {
    flash.style.display = "block";
    let random = Math.floor(Math.random() * flashChooser.length);
    let language = getLangById(flashChooser[random].lang_id);
    flash.style.borderColor = language.color;
    flash.innerHTML = `
    <div class="container">
      <div class="flash-content">
        <span style="background : ${language.color} ">${language.lang}</span>
        <i  class="fa fa-volume-up" 
        data-lang_id="${language.id}" 
        data-content="${
          flashChooser[[random]].word
            ? flashChooser[[random]].word
            : flashChooser[[random]].phrase
        }" 
        onclick="textToSpeash(this)">
    </i>
        <div>
        <h3>${
          flashChooser[[random]].word
            ? flashChooser[[random]].word
            : flashChooser[[random]].phrase
        }</h3>
        <p>${
          flashChooser[[random]].translate
            ? flashChooser[[random]].translate
            : flashChooser[[random]].translation
        }</p>
        </div>
        <i class="fa fa-times" onclick="closeFlash()"></i>
      </div>
    </div>
    `;
  } else if (words.length && phrases.length) {
    closeFlash();
  } else {
    flash.style.display = "none";
  }
}
flashRandom()
let flashInterval = setInterval(flashRandom, 10000);
function closeFlash() {
  document.querySelector(".flash").style.display = "none";
  clearInterval(flashInterval);
}

