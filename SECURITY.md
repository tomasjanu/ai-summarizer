# Security Policy

## Supported Versions

We actively support the latest version of the PDF Summarizer Extension. Security updates will be provided for:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| < 1.1   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in the PDF Summarizer Extension, please help us protect our users by reporting it responsibly.

### How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. **Email us directly** with details about the vulnerability
3. **Include the following information**:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Suggested fix (if you have one)
   - Your contact information for follow-up

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Investigation**: We will investigate and validate the reported vulnerability
- **Timeline**: We aim to provide an initial assessment within 5 business days
- **Fix**: Critical vulnerabilities will be addressed as soon as possible
- **Credit**: We will credit you for the discovery (unless you prefer to remain anonymous)

### Security Best Practices for Users

#### API Key Security
- **Never share your OpenAI API key** with others
- **Store keys securely** - the extension uses Chrome's secure storage
- **Rotate keys regularly** as a security best practice
- **Monitor API usage** in your OpenAI dashboard

#### Extension Security
- **Only install from trusted sources** (Chrome Web Store or this official repository)
- **Keep the extension updated** to the latest version
- **Review permissions** before installing
- **Report suspicious behavior** immediately

#### Data Privacy
- **PDF content is not stored** by the extension
- **API calls are made directly** to OpenAI from your browser
- **No telemetry or tracking** is performed by the extension
- **Local storage** is used only for API keys and preferences

## Known Security Considerations

### API Key Storage
- API keys are stored using Chrome's `chrome.storage.local` API
- Keys are encrypted by Chrome's built-in security mechanisms
- Keys never leave your local machine except for API calls to OpenAI

### PDF Processing
- PDF content is processed locally using PDF.js
- No PDF content is transmitted to third parties except OpenAI for summarization
- Text extraction happens in the browser's security sandbox

### Network Security
- All API calls use HTTPS encryption
- No data is transmitted to servers other than OpenAI's official API
- No external tracking or analytics services are used

### Permissions
The extension requests minimal permissions:
- `activeTab`: Only for accessing the current PDF page
- `storage`: Only for storing API keys locally
- `scripting`: Only for injecting PDF text extraction scripts
- `offscreen`: Only for secure API calls
- API access: Only to `api.openai.com`

## Security Updates

When security vulnerabilities are fixed:

1. **Immediate fix** for critical vulnerabilities
2. **Version bump** to indicate security update
3. **Release notes** with security fix details (without exposing the vulnerability)
4. **Notification** to users through extension update mechanism

## Scope

This security policy covers:

- The PDF Summarizer Extension code
- Extension permissions and data handling
- API key storage and transmission
- User data privacy

This policy does not cover:
- OpenAI's API security (covered by OpenAI's own security policies)
- Chrome browser security vulnerabilities
- User's local machine security

## Contact

For security-related concerns that don't require immediate attention, you can also:

- Create a GitHub issue marked with the "security" label
- Start a GitHub Discussion in the Security category

Thank you for helping keep the PDF Summarizer Extension secure for everyone!