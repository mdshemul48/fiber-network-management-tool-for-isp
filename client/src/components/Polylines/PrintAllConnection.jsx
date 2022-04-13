import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utility/axios';

import PrintHomeConnection from './PrintPolylines/PrintHomeConnection';
import PrintPointToPoint from './PrintPolylines/PrintPointToPoint';

const PrintAllConnection = () => {
  const [polylines, setPolylines] = useState(null);

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

  return polylines?.length ? (
    polylines.map((item) => {
      if (item.type === 'pointToPoint') {
        return <PrintPointToPoint key={item._id} connection={item} />;
      } else {
        return <></>;
      }
    })
  ) : (
    <></>
  );
};

export default PrintAllConnection;
