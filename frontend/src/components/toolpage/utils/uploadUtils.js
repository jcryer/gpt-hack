// uploadUtils.js

const uploadFiles = async ({invoicesFiles, statementsFiles}, text) => {
  const formData = new FormData();

  // Append invoices files to the formData with keys indicating their origin and index
  invoicesFiles.forEach((file, index) => {
    console.log(`Appending invoice file: ${file.name}`);
    formData.append(`invoicesFiles[${index}]`, file); // Key format: invoicesFiles[index]
  });

  // Append statements files to the formData with keys indicating their origin and index
  statementsFiles.forEach((file, index) => {
    console.log(`Appending statement file: ${file.name}`);
    formData.append(`statementsFiles[${index}]`, file); // Key format: statementsFiles[index]
  });

  // Append text to the formData
  formData.append('text', text);

  // Logging formData contents (for debugging purposes)
  for (var pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1].name || pair[1]}`);
  }

  try {
    const response = await fetch('/reconcile', { //route to
      method: 'POST',
  
      body: formData,
    });

    if (response.ok) {
      // Server response is OK, parse and return the JSON response
      return await response.json();
    } else {
      // Server responded with an error status, throw an error
      throw new Error('Upload failed');
    }
  } catch (error) {
    // An error occurred during the fetch operation, log and rethrow it
    console.error('Error:', error);
    throw error;
  }
};

export { uploadFiles };



