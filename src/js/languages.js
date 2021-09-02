// ====> Add lang
function OpenColorList() {
  console.log("Run...");
  document.getElementById("langColor").classList.toggle("show-color");
}
window.addEventListener("DOMContentLoaded", () => {
  let colorListItem = document.querySelectorAll("#langColor li");
  colorListItem.forEach((item) => {
    item.addEventListener("click", () => {
      OpenColorList();
      document.querySelector(".choose-color i.fa-palette").style.color =
        item.dataset.color;
    });
  });
});
function addLang() {
  const inputLang = document.querySelector(".form-add-lang select");
  let checkLang = false 
  languages.map(language => {
    if(language.lang === inputLang.value)
      checkLang = true
  });

  if (inputLang.value !== "" && !checkLang) {
    let language = {
      id: serialNumber(inputLang.value),
      lang: inputLang.value,
      color: document.querySelector(".choose-color i").style.color,
    };
    languages.push(language);
    store.saveLang(languages);
    document.querySelector(".languages").append(createLang(language))
  }
}

if (document.querySelector(".langs-page")) {
  function deleteLang(element) {
    document.getElementById(element.dataset.id).style.display = "none";
    let newLangs = languages.filter(
      (language) => language.id !== element.dataset.id
    );
    store.saveLang(newLangs);
    let newLists = lists.filter(
      (list) => list.lang_id !== element.dataset.lang_id
    );
    store.saveList(newLists);
    let newWords = words.filter(
      (word) => word.lang_id !== element.dataset.lang_id
    );
    store.saveWords(newWords);
    let newAlphabet = alphabet.filter(
      (alpha) => alpha.lang_id !== element.dataset.lang_id
    );
    store.saveAlphabet(newAlphabet);
  }
  for (let language of languages) {
    document.querySelector(".languages").append(createLang(language));
  }
}


function createLang(language) {
  let div = document.createElement("div");
  div.classList.add("box");
  div.id = language.id
  div.style.background = `${language.color}`
  div.innerHTML = `
    <h3>${language.lang}</h3>
    <i class="fa fa-times del" data-id="${language.id}" data-lang_id="${language.id}" onclick="deleteLang(this)"></i>`;
  return div;
}
