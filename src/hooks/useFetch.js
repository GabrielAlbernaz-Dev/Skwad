import React, { useCallback, useState } from 'react'

const useFetch = () => {
    const [data,setData] = useState();
    const [error,setError] = useState();
    const [loading,setLoading] = useState();

    const request = useCallback(async (url,options) => {
        let response;
        let json;
        try {
            setError(null);
            setLoading(true);
            response = await fetch(url,options);
            json = await response.json();
            if(!response.ok) throw new Error(json.message);
        } catch (error) {
            setError(error.message);
        } finally {
            setData(json);
            setLoading(false);
            return {response,json};
        }
    });

  return {
    data,loading,error,request
  }
}

export default useFetch