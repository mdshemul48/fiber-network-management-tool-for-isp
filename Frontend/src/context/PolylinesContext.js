import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utility/axios";

export const PolylinesContext = createContext({
  polylines: [],
  setPolylines: () => {},
  setFetch: () => {},
});

export const PolylinesContextProvider = (props) => {
  const [polylines, setPolylines] = useState([]);
  const [newAddedPolyline, setNewAddedPolyline] = useState(null);
  const [fetch, setFetch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/getAllConnection");
      const {
        data: { data },
      } = response;
      setPolylines(data);
      setNewAddedPolyline(null);
      setFetch(null);
    };
    fetchData();
  }, [newAddedPolyline, fetch]);

  return (
    <PolylinesContext.Provider value={{ polylines, setPolylines, setNewAddedPolyline, setFetch }}>
      {props.children}
    </PolylinesContext.Provider>
  );
};
