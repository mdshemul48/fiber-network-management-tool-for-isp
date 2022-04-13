import React, { useState, useEffect } from 'react';
import PrintLocalFiber from './PrintPolylines/PrintLocalFiber';
import axiosInstance from '../../utility/axios';

import PrintPointToPoint from './PrintPolylines/PrintPointToPoint';
import PrintReseller from './PrintPolylines/PrintReseller';

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
      } else if (item.type === 'reseller') {
        return <PrintReseller key={item._id} connection={item} />;
      } else if (item.type === 'localFiber') {
        return <PrintLocalFiber key={item._id} connection={item} />;
      } else {
        return <></>;
      }
    })
  ) : (
    <></>
  );
};

export default PrintAllConnection;
