// offscreen.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen') {
    return false; // Not for us
  }

  if (message.action === 'callOpenAI') {
            // Handle the API call asynchronously
        (async () => {
          try {
            // Truncate text if it's too long for the model's context window
            // GPT-3.5-turbo has 16,385 tokens limit, leaving room for system prompt and response
            const maxTextLength = 20000; // Roughly 8,000 tokens (very conservative ~2.5 chars per token)
            let processedText = message.text;
            
            if (processedText.length > maxTextLength) {
              processedText = processedText.substring(0, maxTextLength) + "\n\n[Text byl zkrácen kvůli omezení délky...]";
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${message.apiKey}`
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "system",
                    content: "You are a helpful assistant that summarizes PDF documents. Always provide a concise summary of the given text in Czech language, regardless of the topic or content. Only refuse to summarize if the text is corrupted, contains only random characters, or is extremely short (less than 50 characters)."
                  },
                  {
                    role: "user",
                    content: processedText
                  }
                ],
            max_tokens: 300, 
            temperature: 0.5
          })
        });

        const responseBody = await response.json(); // Always try to parse JSON

        if (!response.ok) {
          // Pass OpenAI's error message if available
          const errorMessage = responseBody.error ? responseBody.error.message : 'Unknown API error';
          sendResponse({ summary: null, error: `OpenAI API Error: ${response.status} - ${errorMessage}` });
          return;
        }

        if (responseBody.choices && responseBody.choices.length > 0 && responseBody.choices[0].message) {
          sendResponse({ summary: responseBody.choices[0].message.content.trim(), error: null });
        } else {
          // This case might happen if the response is 200 OK but the structure is unexpected
          sendResponse({ summary: null, error: 'No summary content returned from OpenAI, or unexpected response structure.' });
        }
      } catch (error) {
        console.error('Error in offscreen document calling OpenAI:', error);
        sendResponse({ summary: null, error: `Network or other error in offscreen document: ${error.message}` });
      }
    })();
    
    return true; // Indicates that the response is sent asynchronously
  }
  
  return false;
});
