if (document.querySelector(".alphabet-page")) {
  // Add char
  let char = document.querySelector(".form-add-alphabet .char");
  let sound = document.querySelector(".form-add-alphabet .sound");
  let lang = document.querySelector(".form-add-alphabet .check-language");
  let newChar = alphabet;
  function addChar() {
    if (char.value !== "" && sound.value !== "" && lang.value !== "") {
      newChar.push({
        id: serialNumber(`alphabet${sound.value}`),
        char: char.value,
        sound: sound.value,
        lang_id: lang.value,
      });
      store.saveAlphabet(newChar);
      char.value = "";
      sound.value = "";
      displayAlphabet();
    }
  }
  // Delete char
  function deleteChar(element) {
    let newList = alphabet.filter((alpha) => alpha.id !== element.dataset.id);
    store.saveAlphabet(newList);
    element.parentElement.style.display = "none";
  }
  function createAlphabetContent(alpha) {
    let alphabetContent = document.createElement("div");
    let alphaLang = getLangById(alpha.lang_id);
    alphabetContent.innerHTML = `
      <div class="char-box" style="border-top: 2px solid ${alphaLang.color} ">
        <h3 style="color: ${alphaLang.color} ">${alpha.char}</h3>
        <span class="char-lang" style="background: ${
          alphaLang.color
        } ">${alphaLang.lang.slice(0, 2)}</span>
        <span class="char-sound">${alpha.sound}</span>
        <span class="char-del del" data-id="${
          alpha.id
        }" onclick="deleteChar(this)"><i class="fa fa-times"></i> </span>
        <i class="fa fa-volume-up" data-lang_id="${
          alphaLang.id
        }" data-content="${alpha.char}" onclick="textToSpeash(this)"></i>
      </div>
  `;
    return alphabetContent;
  }
  // Display alphabet with filter
  function displayAlphabet() {
    let alphabetEl = document.querySelector(".alphabet");
    if (alphabet.length) {
      alphabetEl.innerHTML = "";
      for (let alpha of alphabet) {
        alphabetEl.append(createAlphabetContent(alpha));
      }
    } else {
      alphabetEl.innerHTML =
        '<div class="empty"><i class="fa fa-ban"></i> There\'s no Alphabet</div>';
    }

    displayAlphabetLang();
  }
  displayAlphabet();
  // Display lang and count of chars
  function displayAlphabetLang() {
    let alphabetLangContent = "";
    let filter = `Filter: <button data-lang_id="all" onclick="filterAlphabetByLang(this)">All
      <span>${alphabet.length}</span> 
    </button>`;
    for (let language of languages) {
      alphabetLangContent += `
          <div class="alphabet-lang-box" style="background: ${language.color}">
            ${language.lang}
            <span>${getAlphabetOfLang(language.id).length || "empty"}</span>
          </div>
        `;
      filter += `<button data-lang_id="${
        language.id
      }" onclick="filterAlphabetByLang(this)">${language.lang} <span>${
        getAlphabetOfLang(language.id).length
      }</span> </button>`;
    }
    if(alphabetLangContent){
      document.querySelector(".alphabet-filter").innerHTML = filter;
      document.querySelector(".alphabet-lang").innerHTML = alphabetLangContent;
    }
  }
  function filterAlphabetByLang(element) {
    let langId = element.dataset.lang_id; 
    let alphaEl =  document.querySelector(".alphabet")
    alphaEl.innerHTML = ''
    activeElementInList(element);
    if(langId === 'all') {
      for (let alpha of alphabet)
          alphaEl.append(createAlphabetContent(alpha));
    } else {
      let filtersAlpha = alphabet.filter(
        (alpha) => alpha.lang_id === langId
      );
      if(filtersAlpha.length){
        for (let alpha of filtersAlpha)
          alphaEl.append(createAlphabetContent(alpha));
      } else 
        alphaEl.innerHTML = `<div class="empty"><i class="fa fa-ban"></i> There\'s no Alphabet for ${getLangById(langId).lang} language</div>`
    }
    
  }
}
