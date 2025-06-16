# PDF Summarizer Extension

This is a Chrome extension that summarizes PDF files using an AI model.

## Features

- Summarize PDF files from the web or local files.
- Save summaries to view later.
- View and delete saved summaries.

## How to use

1.  Clone this repository.
2.  Open Chrome and go to `chrome://extensions`.
3.  Enable "Developer mode".
4.  Click "Load unpacked" and select the `pdf-summarizer-extension` directory.
5.  Open a PDF file in Chrome.
6.  Click the extension icon.
7.  Enter your OpenAI API key and click "Save Key".
8.  Click "Summarize PDF".
9.  To save the summary, click "Save Summary".
10. To view saved summaries, click "View Saved".

## Changes

- Added a "Save Summary" button to save the current summary.
- Added a "View Saved" button to view saved summaries.
- Saved summaries are stored in `chrome.storage.local`.
- Saved summaries can be deleted.
- Improved the UI and layout.