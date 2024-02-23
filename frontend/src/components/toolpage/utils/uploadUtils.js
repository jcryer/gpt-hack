// uploadUtils.js

const uploadFiles = async ({invoicesFiles, statementsFile}, text) => {
  console.log("here");
  const formData = new FormData();

  // Append invoices files to the formData with keys indicating their origin and index
  invoicesFiles.forEach((file, index) => {
    console.log(`Appending invoice file: ${file.name}`);
    formData.append(``, file); 
  });

  formData.append(``, statementsFile); 

  // // Append text to the formData
  // formData.append('text', text);

  // Logging formData contents (for debugging purposes)
  for (var pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1].name || pair[1]}`);
  }

  try {
    // const response = await fetch('http://78.129.209.146:25565/upload', { //route to
    const response = await fetch('upload', { //route to
      method: 'POST',
  
      body: formData,
    });

    if (response.ok) {
      let res = await response.json();
      console.log(res);
      // Server response is OK, parse and return the JSON response
      return res;
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



