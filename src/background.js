const MENU_ID_SENTENCE_CASE = "copy-sentence-case";
const MENU_ID_LOWER_CASE = "copy-lower-case";
const MENU_ID_UPPER_CASE = "copy-upper-case";
const MENU_ID_CAMEL_CASE = "copy-camel-case";
const MENU_ID_SPINAL_CASE = "copy-spinal-case";
const MENU_ID_SNAKE_CASE = "copy-snake-case";
const MENU_ID_SEPARATOR = "converter-separator"

chrome.runtime.onInstalled.addListener(() => {
  addMenuEntry()
});

chrome.contextMenus.onClicked.addListener((info, tab) => chrome.tabs.sendMessage(tab.id, {
  copy: true,
  id: info.menuItemId,
  selectedText: info.selectionText.trim()
}));

const addMenuEntry = () => {
  chrome.contextMenus.create({
    id: MENU_ID_SENTENCE_CASE,
    title: "Copy as Sentence Case",
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: MENU_ID_LOWER_CASE,
    title: "Copy as lower case",
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: MENU_ID_UPPER_CASE,
    title: "Copy as UPPER CASE",
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    type: "separator",
    id: MENU_ID_SEPARATOR,
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: MENU_ID_CAMEL_CASE,
    title: "Copy as camelCase",
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: MENU_ID_SPINAL_CASE,
    title: "Copy as spinal-case",
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: MENU_ID_SNAKE_CASE,
    title: "Copy as snake_case",
    contexts: ['selection'],
  });
}

