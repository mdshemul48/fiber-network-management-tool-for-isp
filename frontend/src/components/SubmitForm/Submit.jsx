import React, { useState } from "react";
import SubmitForm from "./SubmitForm";

const Submit = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      {" "}
      <button className="btn btn-dark add-button" onClick={handleShow}>
        Add Connection
      </button>
      <SubmitForm handleClose={handleClose} handleShow={handleShow} show={show} />
    </div>
  );
};

export default Submit;
