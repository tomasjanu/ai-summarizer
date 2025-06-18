document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveApiKeyButton = document.getElementById('saveApiKey');
  const summarizeButton = document.getElementById('summarize');
  const saveSummaryButton = document.getElementById('saveSummary');
  const viewSavedButton = document.getElementById('viewSaved');
  const summaryDiv = document.getElementById('summary');
  const savedSummariesDiv = document.getElementById('savedSummaries');
  const savedSummariesList = document.getElementById('savedSummariesList');
  const loader = document.getElementById('loader');

  let currentFileUrl = '';

  // Function to handle summarization of any text
  function summarizeText(text, source) {
    summaryDiv.textContent = '';
    summaryDiv.style.color = 'black';
    loader.style.display = 'block';
    saveSummaryButton.style.display = 'none';
    savedSummariesDiv.style.display = 'none';
    viewSavedButton.textContent = 'View Saved';

    currentFileUrl = source || 'Selected Text';

    chrome.runtime.sendMessage({ action: "summarizeText", text: text }, (response) => {
      loader.style.display = 'none';
      if (chrome.runtime.lastError) {
        summaryDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
        summaryDiv.style.color = 'red';
      } else if (response.error) {
        summaryDiv.textContent = 'Summarization Error: ' + response.error;
        summaryDiv.style.color = 'red';
      } else if (response.summary) {
        summaryDiv.textContent = response.summary;
        saveSummaryButton.style.display = 'block';
      } else {
        summaryDiv.textContent = 'Failed to get summary.';
        summaryDiv.style.color = 'red';
      }
    });
  }

  // Check for text from context menu on popup load
  chrome.storage.local.get(['summarizeSelectionText'], (result) => {
    if (result.summarizeSelectionText) {
      // Clear the storage item so it's not reused
      chrome.storage.local.remove('summarizeSelectionText');
      // Summarize the text
      summarizeText(result.summarizeSelectionText, 'Selected Text');
    }
  });

  // Load saved API key
  chrome.storage.local.get(['apiKey'], (result) => {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }
  });

  // Save API key
  saveApiKeyButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.local.set({ apiKey: apiKey }, () => {
        summaryDiv.textContent = 'API Key saved.';
        summaryDiv.style.color = 'green';
        setTimeout(() => { summaryDiv.textContent = ''; }, 3000);
      });
    } else {
      summaryDiv.textContent = 'Please enter an API Key.';
      summaryDiv.style.color = 'red';
    }
  });

  // Summarize PDF
  summarizeButton.addEventListener('click', async () => {
    summaryDiv.textContent = '';
    summaryDiv.style.color = 'black';
    loader.style.display = 'block'; // Show loader
    saveSummaryButton.style.display = 'none';
    savedSummariesDiv.style.display = 'none';
    viewSavedButton.textContent = 'View Saved';

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab && tab.url) {
      try {
        currentFileUrl = decodeURIComponent(new URL(tab.url).pathname.split('/').pop());
        if (!currentFileUrl.toLowerCase().endsWith('.pdf')) {
            currentFileUrl = "document.pdf"
        }
      } catch (e) {
        currentFileUrl = "document.pdf"
      }

      const processPdf = (pdfDataSource) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: extractTextFromPdfInPageContext,
          args: [pdfDataSource] // Pass URL or ArrayBuffer
        }, (injectionResults) => {
          if (chrome.runtime.lastError || !injectionResults || injectionResults.length === 0) {
            summaryDiv.textContent = 'Error injecting script or no result: ' + (chrome.runtime.lastError ? chrome.runtime.lastError.message : 'Unknown error during script injection. Ensure the page is a PDF and allows content scripts.');
            summaryDiv.style.color = 'red';
            loader.style.display = 'none';
            return;
          }
          
          const result = injectionResults[0].result;
          if (result && result.error) {
            summaryDiv.textContent = 'Error extracting PDF text: ' + result.error;
            summaryDiv.style.color = 'red';
            loader.style.display = 'none';
            return;
          }

          const pdfText = result ? result.text : null;
          if (pdfText && pdfText.trim().length > 0) {
            summarizeText(pdfText, currentFileUrl);
          } else {
            loader.style.display = 'none'; // Hide loader
            summaryDiv.textContent = 'No text could be extracted from the PDF. The PDF might be image-based or protected. If this is a local file, ensure "Allow access to file URLs" is enabled for the extension.';
            summaryDiv.style.color = 'orange';
          }
        });
      };

      if (tab.url.startsWith('file:///')) {
        // For local files, fetch as ArrayBuffer first
        // This requires "Allow access to file URLs" to be enabled for the extension
        try {
          const response = await fetch(tab.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch local file: ${response.status} ${response.statusText}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          // Convert ArrayBuffer to Uint8Array which is serializable
          const uint8Array = new Uint8Array(arrayBuffer);
          processPdf({ data: Array.from(uint8Array) }); // Convert to regular array for serialization
        } catch (error) {
          console.error('Error fetching local PDF:', error);
          summaryDiv.textContent = `Error fetching local PDF: ${error.message}. Ensure "Allow access to file URLs" is enabled for the extension.`;
          summaryDiv.style.color = 'red';
          loader.style.display = 'none';
        }
      } else if (tab.url.endsWith('.pdf') || 
                 (tab.url.startsWith('filesystem:') && tab.url.includes('.pdf')) ||
                 tab.url.startsWith('blob:chrome-extension://') || // For PDFs in extension viewer
                 tab.url.startsWith('http')) { // General http/https PRDF links
        processPdf(tab.url); // Pass URL directly for web PDFs
      } else {
        loader.style.display = 'none';
        summaryDiv.textContent = 'The current tab does not appear to be a PDF URL. Please open a PDF file in Chrome.';
        summaryDiv.style.color = 'orange';
      }
    } else {
      loader.style.display = 'none'; // Hide loader
      summaryDiv.textContent = 'Could not get active tab information.';
      summaryDiv.style.color = 'red';
    }
  });

  // Save Summary
  saveSummaryButton.addEventListener('click', () => {
    const summaryText = summaryDiv.textContent;
    if (summaryText && currentFileUrl) {
      chrome.storage.local.get({ savedSummaries: [] }, (result) => {
        const savedSummaries = result.savedSummaries;
        savedSummaries.push({ file: currentFileUrl, summary: summaryText, date: new Date().toLocaleString() });
        chrome.storage.local.set({ savedSummaries: savedSummaries }, () => {
          summaryDiv.textContent = 'Summary saved.';
          summaryDiv.style.color = 'green';
          saveSummaryButton.style.display = 'none';
          setTimeout(() => { 
            summaryDiv.textContent = summaryText;
            summaryDiv.style.color = 'black';
           }, 2000);
        });
      });
    }
  });

  // View Saved Summaries
  viewSavedButton.addEventListener('click', () => {
    if (savedSummariesDiv.style.display === 'none') {
      chrome.storage.local.get({ savedSummaries: [] }, (result) => {
        const summaries = result.savedSummaries;
        savedSummariesList.innerHTML = '';
        if (summaries.length > 0) {
          summaries.sort((a,b) => new Date(b.date) - new Date(a.date));
          summaries.forEach((item) => {
            const li = document.createElement('li');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                const newSummaries = summaries.filter(i => i.date !== item.date);
                chrome.storage.local.set({ savedSummaries: newSummaries }, () => {
                    li.remove();
                });
            };
            li.innerHTML = `<b>${item.file}</b> (${item.date}):<br>${item.summary.replace(/\n/g, '<br>')}<br>`;
            li.appendChild(deleteButton)
            savedSummariesList.appendChild(li);
          });
        } else {
          savedSummariesList.innerHTML = '<li>No summaries saved yet.</li>';
        }
        savedSummariesDiv.style.display = 'block';
        viewSavedButton.textContent = 'Hide Saved';
      });
    } else {
      savedSummariesDiv.style.display = 'none';
      viewSavedButton.textContent = 'View Saved';
    }
  });
});

// This function is injected into the active tab's context
async function extractTextFromPdfInPageContext(pdfSource) { // Argument changed
  // Try to load PDF.js if not already available
  if (typeof pdfjsLib === 'undefined') {
    try {
      // Dynamically import the PDF.js library directly in the injected script
      const modulePath = chrome.runtime.getURL('lib/pdf.mjs');
      const pdfjsModule = await import(modulePath);
      window.pdfjsLib = pdfjsModule;
    } catch (error) {
      return { error: `Failed to load PDF.js library: ${error.message}. Ensure the extension has proper permissions and the PDF.js files are available.` };
    }
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('lib/pdf.worker.mjs');

  try {
    // pdfSource can be a URL string or an object like { data: Array }
    // If pdfSource.data is an array (serialized from ArrayBuffer), convert it back to Uint8Array
    let processedPdfSource = pdfSource;
    if (pdfSource && pdfSource.data && Array.isArray(pdfSource.data)) {
      processedPdfSource = { data: new Uint8Array(pdfSource.data) };
    }
    
    const loadingTask = pdfjsLib.getDocument(processedPdfSource);
    const pdf = await loadingTask.promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      // Ensure items exist and str is not undefined before joining
      const pageText = textContent.items.map(item => item.str || '').join(' ');
      fullText += pageText + '\n\n';
    }
    return { text: fullText };
  } catch (error) {
    console.error('Error extracting PDF text with pdf.js in page context:', error);
    // Provide a more detailed error message
    return { error: `Failed to load or parse PDF: ${error.name} - ${error.message}. Check the console on the PDF page for more details. Ensure the PDF URL is accessible.` };
  }
}
