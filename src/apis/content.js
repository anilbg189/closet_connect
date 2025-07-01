const getApiContents = async () => {
  try {
    const response = await fetch(
      "https://closet-recruiting-api.azurewebsites.net/api/data"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getApiContents };
