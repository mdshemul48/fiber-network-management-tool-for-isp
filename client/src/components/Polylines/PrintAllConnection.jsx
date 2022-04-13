import React, { useState, useEffect } from 'react';
import PrintLocalFiber from './PrintPolylines/PrintLocalFiber';
import axiosInstance from '../../utility/axios';

import PrintPointToPoint from './PrintPolylines/PrintPointToPoint';
import PrintReseller from './PrintPolylines/PrintReseller';
import PrintSplitter from './PrintPolylines/PrintSplitter';
import PrintHome from './PrintPolylines/PrintHome';
import EditablePolyline from './PrintPolylines/EditablePolyline';

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

  return (
    <>
      <EditablePolyline />

      {polylines?.length ? (
        polylines.map((item) => {
          if (item.type === 'pointToPoint') {
            return <PrintPointToPoint key={item._id} connection={item} />;
          } else if (item.type === 'reseller') {
            return <PrintReseller key={item._id} connection={item} />;
          } else if (item.type === 'localFiber') {
            return <PrintLocalFiber key={item._id} connection={item} />;
          } else if (item.type === 'splitter') {
            return <PrintSplitter key={item._id} connection={item} />;
          } else if (item.type === 'home') {
            return <PrintHome key={item._id} connection={item} />;
          } else {
            alert('error');
            return null;
          }
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default PrintAllConnection;
