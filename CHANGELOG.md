# Changelog

All notable changes to the PDF Summarizer Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-01-15

### Added
- Context menu integration for summarizing selected text on any webpage
- Save summary functionality with local storage
- View saved summaries feature with management capabilities
- Delete saved summaries option
- Improved UI layout and user experience
- Notification system for better user feedback
- Enhanced error handling and user guidance

### Changed
- Updated to Manifest V3 for better security and performance
- Improved PDF text extraction using latest PDF.js library
- Enhanced API error handling with detailed user messages
- Better storage management for saved summaries

### Fixed
- PDF text extraction issues with certain PDF formats
- API key storage and retrieval reliability
- UI responsiveness on different screen sizes

## [1.0.0] - 2024-01-01

### Added
- Initial release of PDF Summarizer Extension
- PDF text extraction using PDF.js library
- OpenAI GPT-3.5 Turbo integration for summarization
- Czech language summary output
- Secure API key storage
- Support for web-based and local PDF files
- Chrome extension popup interface
- Basic error handling and user feedback

### Features
- Automatic PDF text extraction
- AI-powered summarization
- Secure local API key storage
- Multi-source PDF support (web URLs, local files)
- Chrome's offscreen API for secure processing

---

## Versioning

- **Major version**: Breaking changes or significant new features
- **Minor version**: New features that are backward compatible
- **Patch version**: Bug fixes and small improvements

## Links

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)