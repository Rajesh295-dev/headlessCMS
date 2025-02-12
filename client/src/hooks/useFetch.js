import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest"; // Import the Axios instance

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        //console.log("Fetching data from:", url);



        const res = await makeRequest.get(url);

        console.log("🔍 Fetching:", url);
        // console.log("🔍 Full API Response:", JSON.stringify(res.data, null, 2));

        // console.log("Hook Response Data:", res.data);

        setData(res.data?.data || []); // Ensure data is always an array

      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Refetch when URL changes

  return { data, loading, error };
};

export default useFetch;
