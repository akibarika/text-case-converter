const MENU_ID_SENTENCE_CASE = "copy-sentence-case";
const MENU_ID_LOWER_CASE = "copy-lower-case";
const MENU_ID_UPPER_CASE = "copy-upper-case";
const MENU_ID_CAMEL_CASE = "copy-camel-case";
const MENU_ID_SPINAL_CASE = "copy-spinal-case";
const MENU_ID_SNAKE_CASE = "copy-snake-case";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({status: 'ok'});
  let selectedText = message.selectedText

  switch (message.id) {
    case MENU_ID_SENTENCE_CASE:
      selectedText = toSentenceCase(selectedText)
      break
    case MENU_ID_LOWER_CASE:
      selectedText = selectedText.toLowerCase()
      break
    case MENU_ID_UPPER_CASE:
      selectedText = selectedText.toUpperCase()
      break
    case MENU_ID_SPINAL_CASE:
      selectedText = toSpinalCaseOrSnakeCase(selectedText)
      break
    case MENU_ID_CAMEL_CASE:
      selectedText = toCamelCase(selectedText)
      break
    case MENU_ID_SNAKE_CASE:
      selectedText = toSpinalCaseOrSnakeCase(selectedText, false)
      break
    default:
      console.warn(JSON.stringify(selectedText), ' is not valid');
  }
  console.log(selectedText)
  copyText(selectedText)
});

const copyText = (value) => {
  const command = "copy";
  document.addEventListener(command, listener);
  document.execCommand(command);
  document.removeEventListener(command, listener);

  function listener(event) {
    event.clipboardData.setData("text/plain", value);
    event.preventDefault();
  }
}

const toSentenceCase = (str) => {
  let words = str.split(" ").map(word => {
    return word[0].toUpperCase() + word.slice(1);
  })
  return words.join(" ");
}

const toSpinalCaseOrSnakeCase = (str, flag = true) => {
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return str.split(/\s+|_+/).join(flag ? '-' : '_').toLowerCase();
}

const toCamelCase = (str) => {
  return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
