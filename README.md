# PDF Summarizer Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)
[![OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991.svg)](https://openai.com)

A powerful Chrome extension that automatically summarizes PDF documents using OpenAI's GPT models. Extract key insights from academic papers, reports, articles, and any text-based PDF with just one click.

## ✨ Features

- 📄 **Smart PDF Processing**: Automatically extracts text from any PDF document
- 🤖 **AI-Powered Summaries**: Uses OpenAI's GPT-3.5 Turbo for intelligent summarization
- 💾 **Save & Organize**: Save summaries locally and organize them for future reference
- 🌐 **Multi-Source Support**: Works with web PDFs, local files, and Chrome's PDF viewer
- 🔒 **Privacy-Focused**: Your API key and data stay local - no external tracking
- ⚡ **Fast & Efficient**: Optimized for performance using Chrome's latest APIs
- 🎯 **Context Menu Integration**: Summarize selected text on any webpage
- 🗂️ **Summary Management**: View, organize, and delete saved summaries

## 🚀 Quick Start

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pdf-summarizer-extension.git
   cd pdf-summarizer-extension
   ```

2. **Load the extension in Chrome**:
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked" and select the `pdf-summarizer-extension` directory

3. **Get your OpenAI API key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key for the next step

### First Use

1. **Open any PDF** in Chrome (web-based or local file)
2. **Click the extension icon** in your toolbar
3. **Enter your OpenAI API key** and click "Save Key"
4. **Click "Summarize PDF"** and wait for your summary
5. **Save the summary** (optional) for future reference

## 📖 Detailed Usage

### PDF Summarization

The extension works with various PDF sources:
- **Web PDFs**: Any PDF opened from a URL
- **Local Files**: PDFs from your computer (requires file URL permission)
- **Chrome PDF Viewer**: PDFs opened in Chrome's built-in viewer

### Text Selection Summary

1. **Select any text** on any webpage
2. **Right-click** and choose "Summarize Selection"
3. **View the summary** in the popup alert

### Managing Summaries

- **Save summaries**: Click "Save Summary" to store locally
- **View saved summaries**: Click "View Saved" to see your collection
- **Delete summaries**: Remove summaries you no longer need
- **Organize**: Summaries include timestamps and source information

## 🛠️ Technical Details

### Architecture

- **Manifest V3**: Latest Chrome extension standards
- **Service Worker**: Efficient background processing
- **Offscreen API**: Secure API calls without exposing credentials
- **PDF.js Integration**: Reliable text extraction from PDFs

### Security & Privacy

- ✅ **Local API key storage** using Chrome's secure storage
- ✅ **No data collection** or external tracking
- ✅ **Direct API calls** to OpenAI only
- ✅ **Minimal permissions** requested
- ✅ **Open source** for transparency

### Requirements

- Chrome browser (version 88+)
- OpenAI API key
- Internet connection for API calls

## 📁 Project Structure

```
pdf-summarizer-extension/
├── manifest.json          # Extension configuration
├── background.js           # Service worker
├── popup.html             # Main interface
├── popup.js               # UI logic and PDF processing
├── offscreen.js           # Secure API handling
├── content_script_loader.js # Dynamic script injection
├── lib/                   # PDF.js library files
└── icons/                 # Extension icons
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Reporting bugs
- Suggesting features
- Code contribution process
- Development setup
- Coding standards

## 🔒 Security

Security is important to us. Please review our [Security Policy](SECURITY.md) for:

- Reporting vulnerabilities
- Security best practices
- Data privacy information
- Supported versions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Issues

- **Bug Reports**: [Create an issue](https://github.com/your-username/pdf-summarizer-extension/issues)
- **Feature Requests**: [Open a discussion](https://github.com/your-username/pdf-summarizer-extension/discussions)
- **Questions**: Check existing issues or start a discussion

## 🙏 Acknowledgments

- **PDF.js**: Mozilla's PDF rendering library
- **OpenAI**: For providing the GPT API
- **Chrome Extensions Team**: For the excellent documentation and APIs

---

Made with ❤️ for the Chrome community