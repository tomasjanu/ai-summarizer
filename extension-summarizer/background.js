chrome.runtime.onInstalled.addListener(() => {
  // Remove any existing context menus to ensure a clean install
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "summarizeSelection",
      title: "Summarize Selection",
      contexts: ["selection"]
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarizeSelection" && info.selectionText) {
    // Save the selected text to local storage
    chrome.storage.local.set({ summarizeSelectionText: info.selectionText }, () => {
      // Open the popup. Note: This API is available in Chrome 127+ for all extensions.
      // For older versions, it might be restricted.
      chrome.action.openPopup();
    });
  }
});

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarizePdf" || request.action === "summarizeText") {
    // Ensure we have an API key
    chrome.storage.local.get(['apiKey'], (result) => {
      if (!result.apiKey) {
        sendResponse({ error: "API key not set. Please set it in the extension options." });
        return true; // Indicates that the response is sent asynchronously
      }

      const textToSummarize = request.pdfText || request.text;
      if (!textToSummarize) {
        sendResponse({ error: "No text provided to summarize." });
        return true;
      }

      // Create an offscreen document to make the API call
      createOffscreenDocument().then(() => {
        chrome.runtime.sendMessage(
          {
            target: 'offscreen',
            action: 'callOpenAI',
            apiKey: result.apiKey,
            text: textToSummarize
          },
          (response) => {
            if (chrome.runtime.lastError) {
              sendResponse({ error: chrome.runtime.lastError.message });
            } else {
              sendResponse(response);
            }
          }
        );
      }).catch(error => {
        sendResponse({ error: error.message });
      });
    });
    return true; // Indicates that the response is sent asynchronously
  }
});

async function createOffscreenDocument() {
  const offscreenDocumentPath = 'offscreen.html';
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL(offscreenDocumentPath)]
  });

  if (existingContexts.length > 0) {
    return;
  }

  await chrome.offscreen.createDocument({
    url: offscreenDocumentPath,
    reasons: ['DOM_PARSER'],
    justification: 'To make OpenAI API calls without CORS issues in the background script.'
  });
}
