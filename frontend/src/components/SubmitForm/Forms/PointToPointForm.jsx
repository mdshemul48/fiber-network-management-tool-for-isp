import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import axiosInstance from "../../../utility/axios";

import useEditablePolyline from "../../../hooks/useEditablePolyline";
import usePolylines from "../../../hooks/usePolylines";

import CoreSelect from "../../Shared/Form/CoreSelect";

const PointToPointForm = ({ show, handleClose }) => {
  const { coordinates, reset } = useEditablePolyline();
  const { setNewAddedPolyline } = usePolylines();

  const [formData, setFormData] = useState({
    name: "",
    coreCount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, coreCount } = formData;
    const length = window.google.maps.geometry.spherical.computeLength(coordinates);
    const newPointToPointConnection = {
      name: name,
      totalCore: parseInt(coreCount),
      coordinates,
      length,
    };
    toast.promise(axiosInstance.post("/ptp-connection", newPointToPointConnection), {
      loading: () => "Adding new company connection...",

      success: ({ data: { data } }) => {
        setNewAddedPolyline(true);
        reset();
        handleClose();
        return `Successfully added new ${data.type} Connection`;
      },
      error: (error) => {
        console.log(error.response);
        const {
          data: { errors, message },
        } = error.response;
        if (errors) {
          return errors[0].msg;
        }

        if (message) {
          return message;
        }
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add pointToPoint Connection</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Enter Name:</Form.Label>
            <Form.Control type="text" placeholder="Area Name" name="name" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <CoreSelect name="coreCount" onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PointToPointForm;
