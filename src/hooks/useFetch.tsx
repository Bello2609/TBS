import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook for fetching data from an API
const useFetch = (url: string) => {
  // State for storing data
  const [data, setData] = useState<any>(null);
  // State for tracking loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for handling errors
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Making API request
        const response = await axios.get(url);

        // Ensure the response is JSON before updating state
        if (response.headers["content-type"]?.includes("application/json")) {
          setData(response.data);
        } else {
          throw new Error("Invalid response format: Expected JSON but received non-JSON data.");
        }
      } catch (err) {
        // Error handling
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      } finally {
        // Mark loading as false
        setLoading(false);
      }
    };

    // Fetch data
    fetchData();

    // Cleanup function (optional)
    return () => {
      setData(null);
      setLoading(true);
      setError(null);
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
