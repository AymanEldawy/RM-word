
// Generate unique id
const serialNumber = (word) => {
  let length = word.length < 6 ? 8 : word.length;
  let serial = "";
  let alphabet =
    "123456789QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
  for (let i = 0; i < length; i++) {
    let random = Math.floor(Math.random() * alphabet.length);
    serial += alphabet[random];
  }
  return serial;
};
// Active element in list
const activeElementInList = (element) => {
  let siblings = element.parentElement.children;
  for (let sibling of siblings) sibling.classList.remove("active");
  element.classList.add("active");
};

// Toggle page between [results - testing]
function choosePage(element) {
  activeElementInList(element);
  document.querySelector("._title").textContent = element.dataset.page;
  document.querySelector(
    ".show-page"
  ).classList = `show-page show-${element.dataset.page}`;
}


// Action validation
// ====> Check input
function checkInputKeyup(e) {
  let input = e.target;
  if (input.value !== "") {
    if (input.classList.contains("err")) input.classList.remove("err");
    input.classList.add("success");
    setTimeout(() => {
      input.classList.remove("success");
    }, 2000);
  } else {
    input.classList.add("err");
    setTimeout(() => {
      input.classList.remove("err");
    }, 2000);
  }
}
function checkInputBlur(e) {
  if (e.target.value === "") e.target.classList.add("err");
}
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu > li a").forEach((item) => {
    if (item.dataset.link === document.title) {
      item.parentElement.classList.add("active");
    }
  });

  document.querySelectorAll("input[required]").forEach((input) => {
    input.addEventListener("keyup", checkInputKeyup);
    input.addEventListener("blur", checkInputBlur);
  });
});