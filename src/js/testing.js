// Alerts ans message

// show alert
const alertMsg = (type = "success", msg) => {
  if (type === "wrong")
    return `
      <div class="msg-${type}">
        <i class="fa fa-times"></i> 
        <p>${msg || "Opas: wrong answer"}</p> 
        <button onclick="randomTest()">
          <i class="fa fa-arrow-left"></i> 
          Continuation
        </button>
      </div>`;
  else
    return `
      <div class="msg-${type}">
      <i class="fa fa-check"></i> 
      <p>${msg || "Successful : correct answer "}</p>
      <button onclick="randomTest()">
        <i class="fa fa-arrow-left"></i> 
        Continuation
        </button>
      </div>`;
};

if (document.querySelector(".testing")) {
  // results
  // Testing
  function listOfTests(lang_id){
    let newLists = {}
    for(let testing of tests){
      newLists[testing.test] = tests.filter(test => test.test === testing.test && test.lang_id === lang_id )
    }
    return newLists
  }
  function getResultOfTest(test, type){
    return test.filter(t => t[type] === 1 && t.lang_id === test[0].lang_id)
  }
  function createTestResult(language) {
    let listOfTest = listOfTests(language.id)
    let content = '';
    for(let test in listOfTest){
    content += `
        <div class="table-responsive result-testing-table">
          <div class="col table-style-lang">
            <span class="table-col-title">Language</span>
            <p>${language.lang}</p>
          </div>
          <div class="col table-style-test">
            <span class="table-col-title">Test</span>
            <p>${test}</p>
          </div>
          <div class="col table-style-count">
            <span class="table-col-title">All</span>
            <p class="table-count"><a href=""> ${listOfTest[test].length}</a></p>
          </div>
          <div class="col table-style-success">
            <span class="table-col-title">Success</span>
            <p class="table-count"><a href=""> ${getResultOfTest(listOfTest[test],'success').length}</a></p>
            <span class="count-progress" style="width:${ listOfTest[test].length && Math.floor((getResultOfTest(listOfTest[test],'success').length / listOfTest[test].length) * 100 ) + '%'}" ></span>
          </div>
          <div class="col table-style-skip">
            <span class="table-col-title">Skip</span>
            <p class="table-count"><a href=""> ${getResultOfTest(listOfTest[test],'skip').length}</a></p>
            <span class="count-progress" style="width:${ listOfTest[test].length && Math.floor((getResultOfTest(listOfTest[test],'skip').length / listOfTest[test].length) * 100 ) + '%'}" ></span>
          </div>
          <div class="col table-style-wrong">
            <span class="table-col-title">Wrong</span>
            <p class="table-count"><a href=""> ${getResultOfTest(listOfTest[test],'wrong').length}</a></p>
            <span class="count-progress" style="width:${ listOfTest[test].length && Math.floor((getResultOfTest(listOfTest[test],'wrong').length / listOfTest[test].length) * 100 ) + '%'}" ></span>
          </div>
        </div>
       `
    }
    return content;
  }
  function createResultLang() {
    let content = ''
    for(let language of languages){
      content += createTestResult(language)
    }
    document.querySelector('._result').innerHTML = content || '<div class="empty"><i class="fa fa-ban"></i> There\'s no results</div>';
    console.log(content)
  }
  createResultLang()
  
  

  // Testing page
  function testChoose(testType, testQuestion, testAnswer) {
    let random4Words = {};
    if (testType.length > 4) {
      while (Object.keys(random4Words).length < 4) {
        let random = Math.floor(Math.random() * testType.length);
        random4Words[testType[random].id] = testType[random];
      }
      random4Words = Array(...Object.values(random4Words));
    } 
    let itemSelected =
      random4Words[Math.floor(Math.random() * random4Words.length)];
    // Select 1 item for question
    let typeOfTest = ''
    if (random4Words.length >= 4) {
      // loop and display list chooser
      function displayAnswerForChoose() {
        let content = "";
        for (let item of random4Words) {
          if (testAnswer == "sound"){
            content += `<span class="test-choose-item" data-id="${item.id}" >${item[testAnswer]}</span>`;
            typeOfTest = 'alphabet'
          }
          else{
            content += `<p class="test-choose-item" data-id="${item.id}" >${item[testAnswer]}</p>`;
            typeOfTest = 'words'
          }
        }
        return content;
      }

      // Display the test
      document.querySelector(".test").innerHTML = `
            <div class="_test">
              <h3>Choose the correct answer</h3>
                <div class="test-head">
                ${
                  testQuestion === "char"
                    ? `<h2>${itemSelected && itemSelected[testQuestion]}</h2>`
                    : `<p>${itemSelected && itemSelected[testQuestion]}</p>`
                }
                </div>
                <div class="test-input">
                  ${displayAnswerForChoose()}
                </div>
                <div class="test-msg">
                 
                </div>
                <div class="test-submit">
                  <button class="btn primary p-2" disabled>Submit</button>
                  <button class="btn danger p-2">Skip</button>
                </div>
            </div>
          `;
      let listItemChoose = document.querySelectorAll(".test-choose-item");
      // choose answer
      listItemChoose.forEach((item) => {
        item.addEventListener("click", (element) => {
          activeElementInList(element.target);
          document
            .querySelector(".test-submit .primary")
            .removeAttribute("disabled");
        });
      });

      function showMsg(status) {
        if (status === "wrong") return alertMsg("wrong");
        else return alertMsg("success");
      }
      document
        .querySelector(".test-submit .primary")
        .addEventListener("click", () => {
          let itemChooser = document.querySelector(".test-choose-item.active");
          if (itemSelected.id == itemChooser.dataset.id) {
            document.querySelector(".test-msg").classList.add("show");
            document.querySelector(".test-msg").innerHTML = showMsg();
            saveResultTest(typeOfTest, "success", itemSelected);
          } else {
            document.querySelector(".test-msg").classList.add("show");
            document.querySelector(".test-msg").innerHTML = showMsg("wrong");
            saveResultTest(typeOfTest, "wrong", itemSelected);
          }
        });
      document
        .querySelector(".test-submit .danger")
        .addEventListener("click", () => {
          randomTest();
          saveResultTest(typeOfTest, "skip", itemSelected);
        });
    }
  }
  function checkInput(element) {
    element.value
      ? document
          .querySelector(".test-submit .primary")
          .removeAttribute("disabled")
      : document
          .querySelector(".test-submit .primary")
          .setAttribute("disabled", "disabled");
  }
  function testWrite() {
    let random = Math.floor(Math.random() * phrases.length);
    let itemSelected = phrases[random];
    if(getLangById(itemSelected.lang_id).lang.toLowerCase() === 'japanese') randomTest()
    let wordSplit = itemSelected.phrase.split(" ");
    let randomWord = Math.floor(Math.random() * wordSplit.length);
    let wordCheck = wordSplit[randomWord];
    if(wordSplit.length < 2)
      randomTest()
    function splitWord() {
      let content = "<span>";
      for (let word of wordSplit) {
        content += word === wordCheck ? "___________" : ` ${word} `;
      }
      return (content += "</span>");
    }
    splitWord();
    // Display the test
    document.querySelector(".test").innerHTML = `
      <div class="_test">
        <h3>Write the correct answer</h3>
          <div class="test-head">
            <p>${splitWord()}</p>
          </div>
          <div class="test-input">
            <input type="text" onkeyup="checkInput(this)" data-answer="${wordCheck}" placeholder="Enter answer" />
          </div>
          <div class="test-msg">
            
          </div>
          <div class="test-submit">
            <button class="btn primary p-2" disabled>Submit</button>
            <button class="btn danger p-2">Skip</button>
          </div>
      </div>
    `;
    function showMsg(status) {
      if (status === "wrong") return alertMsg("wrong");
      else return alertMsg("success");
    }
    document
      .querySelector(".test-submit .primary")
      .addEventListener("click", () => {
        let inputAnswer = document.querySelector(".test-input input");
        if (inputAnswer.value.toLowerCase() == inputAnswer.dataset.answer.toLowerCase()) {
          document.querySelector(".test-msg").classList.add("show");
          document.querySelector(".test-msg").innerHTML = showMsg();
          saveResultTest("write", "success", itemSelected);
        } else {
          document.querySelector(".test-msg").classList.add("show");
          document.querySelector(".test-msg").innerHTML = showMsg("wrong");
          saveResultTest("write", "wrong", itemSelected);
        }
      });
    document
      .querySelector(".test-submit .danger")
      .addEventListener("click", () => {
        randomTest();
        saveResultTest("write", "skip", itemSelected);
      });
  }

  function randomTest() {
    let random = Math.floor(Math.random() * 4);
    if (random === 0 && alphabet.length > 4) testChoose(alphabet, "char", "sound");
    if (random === 1 && phrases.length > 2) testWrite();
    if (random === 2  && words.length > 4) testChoose(words, "word", "translation");
    else ;
  }
  randomTest()
  function saveResultTest(type, result, itemSelected) {
    let test = {
      id: serialNumber(type),
      test: type,
      item_id: itemSelected.id,
      lang_id: itemSelected.lang_id,
      success: 0,
      skip: 0,
      wrong: 0,
    };
    if (result === "wrong") test.wrong = 1;
    else if (result === "success") test.success = 1;
    else if (result === "skip") test.skip = 1;
    tests.push(test);
    store.saveTests(tests);
  }

}
