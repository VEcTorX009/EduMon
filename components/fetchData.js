export const fetchData = async (s) => {
    try {
      const response = await fetch(`/api/${s}`); // Replace with your API route URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // Handle the fetched data
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };