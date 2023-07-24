let langOption = document.querySelectorAll("select");
let fromText = document.querySelector(".fromText");
let transText = document.querySelector(".toTranslate");
let fromVoice =
  document.querySelector(
    ".from"
  );

let cpyBtn = document.querySelector(".fa-copy");

langOption.forEach((get, con) => {
  for (let countryCode in language) {
    let selected;
    if (con == 0 && countryCode == "en-GB") {
      selected = "selected ";
    } else if (con == 1 && countryCode == "hi-IN") {
      selected = "selected ";
    }

    let option = `<option value="${countryCode}"${selected}>${language[countryCode]}</option>`;
    get.insertAdjacentHTML("beforeend", option);
  }
});
fromText.addEventListener("input", function () {
  let content = fromText.value;
  fromContent = langOption[0].value;
  transContent = langOption[1].value;

  let transLINK = `https://api.mymemory.translated.net/get?q= ${content}!&langpair=${fromContent}|${transContent}`;
  fetch(transLINK)
    .then((translate) => translate.json())
    .then((data) => {
      transText.value = data.responseData.translatedText; 
    });
});
 

fromVoice.addEventListener("click", function f2() {
  let fromTalk;
  fromTalk = new SpeechSynthesisUtterance(fromText.value);
  fromTalk.lang = langOption[0].value;
  speechSynthesis.speak(fromTalk);
});

cpyBtn.addEventListener("click", function f3() {
  navigator.clipboard.writeText(transText.value);
});
