

export async function sendPDFId(url, content) {
    // Prepare the request options
    const requestOptions = {
      method: 'POST', // Use POST method
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify({ content }), // Convert the content into a JSON string
    };
  
    try {
      // Make the API call
      const response = await fetch(url, requestOptions);
  
      // Check if the request was successful
      if (!response.ok) {
        // Throw an error if the request failed
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Return the response data
      return data;
    } catch (error) {
      // Log any errors to the console
      console.error("Error sending content to server:", error);
  
      // Optionally, re-throw the error to handle it elsewhere
      throw error;
    }
  }
  