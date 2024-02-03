import { useState, useEffect } from 'react';
import axios from 'axios';

function delay(time = 1000) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('Timer Finished') }, time); 
    }) 
} 

// TODO: Will possibly be removed after React-Query integration with Axios
// This is just used for the Loading/Error states on User Profile Submission
const useAxios = ({ headers = null }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const fetchData = async (body) => {
      setLoading(true);
      try {
        await delay(7000);
        const response = await axios.put(`/v1/admin/me/`, body, {
          headers: headers
        });
        console.log('axios response: ', response);
        setData(response.data);
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }
      
    }
    
    const submitAxios = async body => {
      await fetchData(body);
    }
    

    // useEffect(() => {
    //     fetchData();
    // }, [method, url, body, headers]);

    return { data, error, isLoading, submitAxios };
};

export default useAxios;