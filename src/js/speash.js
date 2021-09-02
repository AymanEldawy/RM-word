
let synth = window.speechSynthesis;
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = synth.getVoices();
}

const textToSpeash = (element) => {
  let { lang_id, content } = element.dataset;
  let lang = getLangById(lang_id).lang
  if (lang.toLowerCase() === "japanese") speashJP(content,element);
  else if (lang.toLowerCase() === "germany") speashDE(content,element);
  else if (lang.toLowerCase() === "english") speashEN(content,element);
  else if (lang.toLowerCase() === "spanish") speashSp(content,element);
  element.classList.add('active');
  
};
const speashJP = (content,element) => {
  let utterThis = new SpeechSynthesisUtterance(content);
  let japaneseLang = synth.getVoices()[11];
  if (japaneseLang.lang === "ja-JP") {
    utterThis.voice = japaneseLang;
  } else {
    for (let lang of synth.getVoices()) {
      if (lang.lang === "ja-JP") utterThis.voice = lang;
    }
  }
  synth.speak(utterThis);
  utterThis.onend = () => element.classList.remove('active')
};
const speashDE = (content,element) => {
  let utterThis = new SpeechSynthesisUtterance(content);
  let deutscheLang = synth.getVoices()[1];
  if (deutscheLang.lang === "de-DE") {
    utterThis.voice = deutscheLang;
  } else {
    for (let lang of synth.getVoices()) {
      if (lang.lang === "de-DE") utterThis.voice = lang;
    }
  }
  synth.speak(utterThis);
  utterThis.onend = () => element.classList.remove('active')
  
};
const speashEN = (content,element) => {
  let utterThis = new SpeechSynthesisUtterance(content);
  let englishLang = synth.getVoices()[0];
  if (englishLang.lang === "en-US") {
    utterThis.voice = englishLang;
  } else {
    for (let lang of synth.getVoices()) {
      if (lang.lang === "en-US") utterThis.voice = lang;
    }
  }
  synth.speak(utterThis);
  utterThis.onend = () => element.classList.remove('active')
};


const speashSp = (content,element) => {
  let utterThis = new SpeechSynthesisUtterance(content);
  let spanishLang = synth.getVoices()[0];
  if (spanishLang.lang === "es-ES") {
    utterThis.voice = spanishLang;
  } else {
    for (let lang of synth.getVoices()) {
      if (lang.lang === "es-ES") utterThis.voice = lang;
    }
  }
  synth.speak(utterThis);
  utterThis.onend = () => element.classList.remove('active')
};
