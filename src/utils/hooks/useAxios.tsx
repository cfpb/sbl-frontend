import { useState, useEffect } from 'react';
import axios from 'axios';


// TODO: Will possibly be removed after React-Query integration with Axios
// This is just used for the Loading/Error states on User Profile Submission
const useAxios = ({ url = , method = get, body = null, headers = null }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setloading] = useState(true);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = axios[method](url, JSON.parse(headers), JSON.parse(body));
        setData(response.data);
      } {
        
      }
      
    }
    

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { data, error, isLoading };
};

export default useAxios;

    // const fetchData = () => {
    //     axios[method](url, JSON.parse(headers), JSON.parse(body))
    //         .then((res) => {
    //             setResponse(res.data);
    //         })
    //         .catch((err) => {
    //             setError(err);
    //         })
    //         .finally(() => {
    //             setloading(false);
    //         });
    // };