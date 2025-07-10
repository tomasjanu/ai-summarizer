// content_script_loader.js
(async () => {
  const modulePath = chrome.runtime.getURL('lib/pdf.mjs');
  try {
    const pdfjsModule = await import(modulePath);
    // Assuming pdf.mjs exports its members directly (e.g., getDocument, GlobalWorkerOptions)
    // We assign the entire module to window.pdfjsLib
    // This way, popup.js can use pdfjsLib.getDocument, pdfjsLib.GlobalWorkerOptions, etc.
    window.pdfjsLib = pdfjsModule;
    console.log('PDF.js module loaded and attached to window.pdfjsLib');
  } catch (e) {
    console.error('Error loading PDF.js module in content_script_loader.js:', e);
  }
})();
