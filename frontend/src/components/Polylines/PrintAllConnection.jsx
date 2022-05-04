import React from "react";
import PrintLocalFiber from "./PrintPolylines/PrintLocalFiber";

import PrintPointToPoint from "./PrintPolylines/PrintPointToPoint";
import PrintReseller from "./PrintPolylines/PrintReseller";
import PrintSplitter from "./PrintPolylines/PrintSplitter";
import PrintHome from "./PrintPolylines/PrintHome";
import EditablePolyline from "./EditablePolyline";
import usePolylines from "../../hooks/usePolylines";
import PrintCorporate from "./PrintPolylines/PrintCorporate";

const PrintAllConnection = () => {
  const { polylines } = usePolylines();

  return (
    <>
      {polylines?.length &&
        polylines.map((item) => {
          if (item.type === "pointToPoint") {
            return <PrintPointToPoint key={item._id} connection={item} />;
          } else if (item.type === "corporate") {
            return <PrintCorporate key={item._id} connection={item} />;
          } else if (item.type === "reseller") {
            return <PrintReseller key={item._id} connection={item} />;
          } else if (item.type === "localFiber") {
            return <PrintLocalFiber key={item._id} connection={item} />;
          } else if (item.type === "splitter") {
            return <PrintSplitter key={item._id} connection={item} />;
          } else if (item.type === "home") {
            return <PrintHome key={item._id} connection={item} />;
          } else {
            alert("error");
            return null;
          }
        })}
      <EditablePolyline />
    </>
  );
};

export default PrintAllConnection;
