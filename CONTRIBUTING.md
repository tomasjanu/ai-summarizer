# Contributing to PDF Summarizer Extension

Thank you for your interest in contributing to the PDF Summarizer Extension! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** first to see if the bug has already been reported
2. **Create a new issue** with the following information:
   - Clear and descriptive title
   - Steps to reproduce the bug
   - Expected behavior vs actual behavior
   - Chrome version and operating system
   - Extension version
   - Screenshots or error messages if applicable

### Suggesting Features

1. **Check existing issues** to see if the feature has been suggested
2. **Create a new issue** with:
   - Clear description of the feature
   - Use case and benefits
   - Any implementation ideas you might have

### Code Contributions

#### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pdf-summarizer-extension.git
   cd pdf-summarizer-extension
   ```
3. **Load the extension** in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `pdf-summarizer-extension` directory

#### Development Workflow

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards:
   - Use meaningful variable and function names
   - Add comments for complex logic
   - Follow existing code style and formatting
   - Test your changes thoroughly

3. **Test your changes**:
   - Test with various PDF files (web-based and local)
   - Test the API key functionality
   - Test error handling scenarios
   - Ensure the extension works in different scenarios

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add descriptive commit message"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a pull request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots/GIFs for UI changes
   - Test results and verification steps

## Coding Standards

### JavaScript Style Guide

- Use `const` for constants and `let` for variables (avoid `var`)
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Handle errors gracefully with try-catch blocks
- Use async/await instead of nested callbacks where possible

### Chrome Extension Best Practices

- Follow Manifest V3 standards
- Use appropriate permissions (request minimal necessary permissions)
- Handle API rate limits and errors
- Ensure secure storage of sensitive data
- Test with different Chrome versions

### File Organization

- Keep related functionality in appropriate files
- Use clear, descriptive file names
- Add comments explaining complex logic
- Maintain consistent indentation (2 spaces)

## Types of Contributions

We welcome various types of contributions:

- **Bug fixes**: Fix issues in existing functionality
- **New features**: Add new capabilities to the extension
- **Documentation**: Improve README, code comments, or create tutorials
- **Testing**: Add test cases or improve existing tests
- **Performance**: Optimize existing code for better performance
- **UI/UX**: Improve the user interface and user experience
- **Accessibility**: Make the extension more accessible
- **Internationalization**: Add support for more languages

## Development Setup

### Prerequisites

- Chrome browser (latest version recommended)
- OpenAI API key for testing
- Git for version control
- Text editor or IDE

### Testing Your Changes

1. **Load the extension** in Chrome developer mode
2. **Test core functionality**:
   - PDF text extraction
   - API key storage and usage
   - Summary generation
   - Error handling
3. **Test edge cases**:
   - Very large PDFs
   - PDFs with no text
   - Network connectivity issues
   - Invalid API keys

## Pull Request Process

1. **Ensure your PR**:
   - Has a clear title and description
   - References related issues
   - Includes test results
   - Updates documentation if needed

2. **Code review process**:
   - Maintainers will review your code
   - Address any feedback or requested changes
   - Once approved, your PR will be merged

3. **After merging**:
   - Your contribution will be included in the next release
   - You'll be credited as a contributor

## Questions or Need Help?

- **Create an issue** for questions about contributing
- **Check existing issues** for similar questions
- **Be patient** - maintainers will respond as soon as possible

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on what is best for the community
- Show empathy towards other community members
- Use welcoming and inclusive language

Thank you for contributing to make this extension better for everyone!