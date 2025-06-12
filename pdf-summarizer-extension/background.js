// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarizePdf") {
    // Ensure we have an API key
    chrome.storage.local.get(['apiKey'], (result) => {
      if (!result.apiKey) {
        sendResponse({ error: "API key not set. Please set it in the extension options." });
        return true; // Indicates that the response is sent asynchronously
      }

      if (!request.pdfText) {
        sendResponse({ error: "No text found in PDF." });
        return true;
      }

      // Create an offscreen document to make the API call
      createOffscreenDocument().then(() => {
        chrome.runtime.sendMessage(
          {
            target: 'offscreen',
            action: 'callOpenAI',
            apiKey: result.apiKey,
            text: request.pdfText
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
    reasons: ['DOM_PARSER'], // Or other appropriate reasons
    justification: 'To make OpenAI API calls without CORS issues in the background script.'
  });
}
