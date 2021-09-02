function addList() {
  let input = document.querySelector(".form-add-list input");
  let lang_id = document.querySelector(".form-add-list select");
  if (input.value !== "") {
    let list = {
      id: serialNumber(input.value),
      list: input.value,
      lang_id: lang_id.value,
    };
    lists.push(list);
    store.saveList(lists);
    input.value = "";
    if(document.getElementById(list.lang_id))
      document.querySelector(`.lists #${list.lang_id} `).append(createList(list));
    else {
      let div = document.createElement('div');
      div.classList.add('list-group')
      div.id = list.lang_id;
      div.append(createList(list))
      document.querySelector(`.lists`).append(div);
    }
  }
}
if (document.querySelector(".lists-page")) {
  function deleteList(element) {
    element.parentElement.style.display = "none";
    let newLists = lists.filter((list) => list.id !== element.dataset.id);
    store.saveList(newLists);

    let newWords = words.filter(
      (word) => word.list_id !== element.dataset.list_id
    );
    store.saveWords(newWords);
  }
  function createList(list) {
    let language = getLangById(list.lang_id);
    let div = document.createElement("div");
    div.classList.add("box");
    div.style.background = ` ${language.color}`;
    div.innerHTML = `
      <h3>${list.list}</h3>
      <span>${language.lang}</span>
      <i class="fa fa-times del" data-id="${list.id}" data-list_id="${list.id}" onclick="deleteList(this)"></i>`;
    return div;
  }
  function displayList() {
    for(let language of languages){
      let isEmpty = true;
      let group = document.createElement('div');
      group.id = language.id
      group.classList.add('list-group')
      for (let list of lists) {
        if(list.lang_id === language.id){
          group.append(createList(list));
          isEmpty = false
        }
      }
      isEmpty || document.querySelector(".lists").append(group);

    }
  }
  displayList();

  
}
