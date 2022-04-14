import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utility/axios';

export const PolylinesContext = createContext({
  polylines: [],
  setPolylines: () => {},
  fetch: () => {},
});

export const PolylinesContextProvider = (props) => {
  const [polylines, setPolylines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get('/getAllConnection');
      const {
        data: { data },
      } = response;
      setPolylines(data);
    };
    fetchData();
  }, []);

  return (
    <PolylinesContext.Provider value={{ polylines, setPolylines, fetch }}>
      {props.children}
    </PolylinesContext.Provider>
  );
};
