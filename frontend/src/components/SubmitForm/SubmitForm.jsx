import React from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import useEditablePolyline from "../../hooks/useEditablePolyline";
import CompanyForm from "./Forms/CompanyForm";
import HomeForm from "./Forms/HomeForm";
import LocalFiberForm from "./Forms/LocalFiberForm";
import PointToPointForm from "./Forms/PointToPointForm";
import ResellerForm from "./Forms/ResellerForm";
import SplitterForm from "./Forms/SplitterForm";

const SubmitForm = ({ show, handleClose }) => {
  const { parent, coordinates } = useEditablePolyline();
  if (!parent && coordinates.length > 1) {
    return <PointToPointForm parent={parent} show={show} handleClose={handleClose} />;
  } else if (parent?.type === "pointToPoint" && coordinates.length > 1) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Tabs defaultActiveKey="reseller" className="mt-1 mx-2">
          <Tab eventKey="reseller" title="Add Reseller">
            <ResellerForm handleClose={handleClose} />
          </Tab>
          <Tab eventKey="company" title="Add Company">
            <CompanyForm parent={parent} handleClose={handleClose} />
          </Tab>
        </Tabs>
      </Modal>
    );
  } else if (parent?.type === "reseller" || parent?.type === "localFiber") {
    return (
      <Modal show={show} onHide={handleClose}>
        <Tabs defaultActiveKey="splitter" className="mt-1 mx-2">
          <Tab eventKey="splitter" title="Add Splitter">
            <SplitterForm handleClose={handleClose} />
          </Tab>
          <Tab eventKey="localFiber" title="Add Local Fiber">
            <LocalFiberForm handleClose={handleClose} />
          </Tab>
        </Tabs>
      </Modal>
    );
  } else if (parent?.type === "splitter") {
    return (
      <Modal show={show} onHide={handleClose}>
        <Tabs defaultActiveKey="home" className="mt-1 mx-2">
          <Tab eventKey="home" title="Add Home">
            <HomeForm handleClose={handleClose} />
          </Tab>
          <Tab eventKey="splitter" title="Add Splitter">
            <SplitterForm handleClose={handleClose} />
          </Tab>
        </Tabs>
      </Modal>
    );
  }

  return <div></div>;
};

export default SubmitForm;
