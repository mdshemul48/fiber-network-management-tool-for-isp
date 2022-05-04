import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import useEditablePolyline from "../../../hooks/useEditablePolyline";
import usePolylines from "../../../hooks/usePolylines";
import axiosInstance from "../../../utility/axios";
import coreColor from "../../../utility/coreColor";

import CoreSelect from "../../Shared/Form/CoreSelect";

const SplitterForm = ({ handleClose }) => {
  const { coordinates, reset, parent } = useEditablePolyline();
  const { setNewAddedPolyline } = usePolylines();

  const [formData, setFormData] = useState({
    name: "",
    OltPortNo: "",
    color: "",
    splitterType: "",
    coreCount: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, OltPortNo, color, splitterType, coreCount } = formData;
    const length = window.google.maps.geometry.spherical.computeLength(coordinates);
    const newPolyline = {
      parentType: parent.type,
      parent: parent._id,
      name: name,
      coordinates,
      splitterLimit: splitterType,
      color: color,
      portNo: OltPortNo,
      totalCore: parseInt(coreCount),
      length,
    };
    toast.promise(axiosInstance.post("/splitter-connection", newPolyline), {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getUnusedColor = () => {
    if (parent.type === "splitter") {
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
    } else if (parent.type === "localFiber") {
      const coreColors = coreColor.slice(0, parent.totalCore);

      const colors = coreColors.map((item) => {
        const foundedColor = (parent.mainLocalFiber ? parent.mainLocalFiber.childrens : parent.childrens).find(
          (child) => {
            return child.color === item.colorName;
          }
        );
        return foundedColor ? "" : <option value={item.colorName}>{item.colorName}</option>;
      });
      return colors;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Control type="text" placeholder="Name" name="name" onChange={handleChange} />
        </Form.Group>
        {parent.type !== "splitter" && (
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Olt Port No" name="OltPortNo" onChange={handleChange} />
          </Form.Group>
        )}

        {(parent.type === "localFiber" || parent.type === "splitter") && (
          <Form.Group className="mb-2">
            <Form.Select name="color" defaultValue={"0"} onChange={handleChange}>
              <option value="0">Select Fiber Core</option>
              {getUnusedColor()}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Select defaultValue={"0"} onChange={handleChange} name="splitterType">
            <option selected value="0">
              Select Splitter Type
            </option>
            <option value="2">1/2</option>
            <option value="4">1/4</option>
            <option value="8">1/8</option>
            <option value="16">1/16</option>
            <option value="32">1/32</option>
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

export default SplitterForm;
