// uploadUtils.js

const uploadFiles = async (files, text) => {
    const formData = new FormData();
  
    // Append files to the formData
    for (let file of files) {
      console.log(`Appending file: ${file.name}`);
      formData.append('files', file);
    }
  
    // Append text to the formData
    formData.append('text', text);
  

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    try {
      const response = await fetch('/analyzeCv', {
        method: 'POST',
        headers: {
          // Don't set 'Content-Type' header, let the browser set it
          // 'Content-Type': 'multipart/form-data' 
        },
        body: formData,
      });
  
      if (response.ok) {
        return await response.json(); // Returns the response from the server
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  export { uploadFiles };
  