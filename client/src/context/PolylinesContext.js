import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utility/axios';

export const PolylinesContext = createContext({
  polylines: [],
  setPolylines: () => {},
  fetch: () => {},
});

export const PolylinesContextProvider = (props) => {
  const [polylines, setPolylines] = useState([]);
  const [newAddedPolyline, setNewAddedPolyline] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching polylines');
      const response = await axiosInstance.get('/getAllConnection');
      const {
        data: { data },
      } = response;
      setPolylines(data);
      setNewAddedPolyline(null);
    };
    fetchData();
  }, [newAddedPolyline]);

  return (
    <PolylinesContext.Provider
      value={{ polylines, setPolylines, setNewAddedPolyline }}
    >
      {props.children}
    </PolylinesContext.Provider>
  );
};
