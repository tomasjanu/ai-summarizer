# PDF Summarizer AI

A Chrome extension that summarizes PDF documents and selected text using OpenAI's GPT-3.5 Turbo model. The extension extracts text from PDF files or web pages and generates concise summaries in Czech language.

## Features

- 📄 **PDF Text Extraction**: Uses PDF.js to extract text from PDF documents
- 🤖 **AI-Powered Summarization**: Leverages OpenAI's GPT-3.5 Turbo for intelligent summarization
- 🇨🇿 **Czech Language Output**: Generates summaries in Czech language
- 🖱️ **Summarize Selected Text**: Right-click any selected text on a webpage and choose "Summarize Selection"
- 💾 **Save Summaries**: Save generated summaries for later viewing
- 👀 **View & Delete Saved Summaries**: Easily view and delete your saved summaries
- 🔒 **Secure API Key Storage**: Safely stores your OpenAI API key locally
- 🌐 **Multiple PDF Sources**: Works with web URLs, local files, and Chrome's built-in PDF viewer
- ⚡ **Offscreen Processing**: Uses Chrome's offscreen API for better performance and security

## Installation

### Option 1: Developer Mode (Recommended for development)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension will appear in your toolbar

### Option 2: Enable File URL Access (for local PDFs)

If you want to summarize local PDF files:
1. Go to `chrome://extensions/`
2. Find the PDF Summarizer AI extension
3. Click "Details"
4. Enable "Allow access to file URLs"

## Setup

### Getting an OpenAI API Key

1. Visit [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to the API section
4. Generate a new API key
5. Copy the API key (you'll need it in the next step)

### Configuring the Extension

1. Click the extension icon in your Chrome toolbar
2. Enter your OpenAI API key in the input field
3. Click "Save Key" to store it securely
4. The key will be saved locally and used for all future summarizations

## Usage

### Summarize a PDF File

1. **Open a PDF file** in Chrome:
   - Web-based PDF (any HTTP/HTTPS URL ending in .pdf)
   - Local PDF file (requires "Allow access to file URLs" permission)
   - PDF opened in Chrome's built-in viewer
2. **Click the extension icon** in your toolbar
3. **Click "Summarize PDF"** button
4. **Wait for processing** - the extension will:
   - Extract text from the PDF using PDF.js
   - Send the text to OpenAI's API
   - Display the summary in Czech language
5. **Save the summary** (optional): Click "Save Summary" to store it for later
6. **View saved summaries**: Click "View Saved" to see all your saved summaries. You can delete any summary from this list.

### Summarize Selected Text on Any Webpage

1. Select any text on a webpage
2. Right-click and choose "Summarize Selection" from the context menu
3. The summary will be shown in an alert or popup

## Technical Details

### Architecture

- **Manifest V3**: Uses the latest Chrome extension format
- **Service Worker**: Background script for message handling
- **Offscreen Document**: Secure API calls without exposing keys to content scripts
- **Content Script Injection**: Dynamic PDF.js loading for text extraction
- **Context Menu Integration**: Adds a right-click menu for summarizing selected text
- **Local Storage**: Summaries and API key are stored using `chrome.storage.local`

### API Limits

- **Text Length**: Limited to ~20,000 characters (~8,000 tokens) to fit within GPT-3.5 Turbo's context window
- **Summary Length**: Maximum 300 tokens for concise summaries
- **Rate Limits**: Subject to OpenAI's API rate limits based on your account tier

### Supported PDF Types

- ✅ Text-based PDFs (with selectable text)
- ✅ Web-hosted PDFs
- ✅ Local PDF files (with proper permissions)
- ❌ Image-based PDFs (scanned documents without OCR)
- ❌ Password-protected PDFs

## File Structure

```
pdf-summarizer-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for message handling and context menu
├── offscreen.js           # Secure API call handler
├── offscreen.html         # Offscreen document template
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality, PDF processing, summary saving/viewing
├── content_script_loader.js # Dynamic content script loading
├── lib/
│   ├── pdf.mjs           # PDF.js library
│   └── pdf.worker.mjs    # PDF.js web worker
└── icons/
    ├── drink_water16.png
    ├── drink_water32.png
    ├── drink_water48.png
    └── drink_water128.png
```

## Permissions

The extension requires the following permissions:

- `activeTab`: Access to the currently active tab for PDF processing
- `storage`: Store API key and summaries securely
- `scripting`: Inject PDF text extraction scripts
- `offscreen`: Create offscreen documents for secure API calls
- `contextMenus`: Add right-click menu for summarizing selected text
- `https://api.openai.com/*`: Make requests to OpenAI API
- `<all_urls>`: Access PDFs and web pages from any domain

## Error Handling

The extension provides detailed error messages for common issues:

- **Invalid API Key**: Check your OpenAI API key
- **Network Errors**: Verify internet connection
- **PDF Access Issues**: Ensure file permissions are enabled
- **Text Extraction Failures**: May occur with image-based or protected PDFs
- **API Rate Limits**: Wait and try again later

## Privacy & Security

- **API Key Storage**: Stored locally using Chrome's storage API
- **Summary Storage**: Saved summaries are stored locally and never sent to a server
- **No Data Retention**: PDF content is not stored or logged externally
- **Secure Communication**: API calls made through offscreen documents
- **Minimal Permissions**: Only requests necessary permissions

## Troubleshooting

### Common Issues

1. **"No text could be extracted"**
   - The PDF might be image-based (scanned)
   - Enable "Allow access to file URLs" for local files

2. **"API Error"**
   - Check your OpenAI API key is valid
   - Verify you have API credits available
   - Check your internet connection

3. **"Extension not working on local files"**
   - Go to `chrome://extensions/`
   - Enable "Allow access to file URLs" for the extension

## Development

### Prerequisites

- Chrome browser
- OpenAI API key
- Basic knowledge of Chrome extension development

### Local Development

1. Clone the repository
2. Make your changes
3. Reload the extension in `chrome://extensions/`
4. Test with various PDF files and web pages

## License

This project is open source. Please check the license file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## Support

If you encounter any issues or have questions, please create an issue in the project repository. 