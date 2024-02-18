export const generateEmails = async (settings, tsvData) => {
    try {
      const response = await fetch('/generateEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings, tsvData })
      });
  
      if (response.ok) {
        return await response.json(); // Handle the response as needed
      } else {
        throw new Error('Failed to generate emails');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const sendGeneratedEmails = async (data, settings) => {
    try {
      const response = await fetch('/sendGeneratedEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, settings })
      });
  
      if (response.ok) {
        return await response.json(); // Process server response
      } else {
        throw new Error('Failed to send emails');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };