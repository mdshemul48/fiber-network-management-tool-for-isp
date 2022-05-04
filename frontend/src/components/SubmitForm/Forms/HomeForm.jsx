import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import useEditablePolyline from "../../../hooks/useEditablePolyline";
import usePolylines from "../../../hooks/usePolylines";
import axiosInstance from "../../../utility/axios";
import coreColor from "../../../utility/coreColor";
import CoreSelect from "../../Shared/Form/CoreSelect";

const HomeForm = ({ handleClose }) => {
  const { coordinates, reset, parent } = useEditablePolyline();
  const { setNewAddedPolyline } = usePolylines();
  const [formData, setFormData] = useState({
    name: "",
    onuNo: "",
    color: "",
    coreCount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getUnusedColor = () => {
    const coreColors = coreColor.slice(0, parent.splitterLimit);
    const colors = coreColors.map((item) => {
      const foundedColor = parent.childrens.find((child) => {
        return child.color === item.colorName;
      });
      if (foundedColor) {
        return null;
      }
      return <option value={item.colorName}>{item.colorName}</option>;
    });
    return colors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const length = window.google.maps.geometry.spherical.computeLength(coordinates);

    const { name, onuNo, color, coreCount } = formData;
    const homeConnection = {
      parent: parent._id,
      name: name,
      coordinates,
      onuNo: onuNo,
      color: color,
      totalCore: parseInt(coreCount),
      length,
    };
    toast.promise(axiosInstance.post("/home-connection", homeConnection), {
      loading: () => "Adding new reseller connection...",
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
    <Form onSubmit={handleSubmit}>
      <Modal.Body>
        <Form.Group>
          <Form.Control className="mt-2" type="text" placeholder="Name" name="name" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Control className="mt-2" type="text" placeholder="ONU Number" name="onuNo" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Select name="color" defaultValue={"0"} onChange={handleChange}>
            <option value="0">Select Fiber Core</option>
            {getUnusedColor()}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-2">
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
  );
};

export default HomeForm;
