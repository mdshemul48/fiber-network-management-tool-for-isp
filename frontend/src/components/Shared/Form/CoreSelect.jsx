import React from "react";
import { Form } from "react-bootstrap";

const CoreSelect = ({ name, onChange }) => {
  return (
    <Form.Select name={name} defaultValue={"0"} onChange={onChange}>
      <option value="0">Fiber Core Count..</option>
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="8">8</option>
      <option value="12">12</option>
      <option value="16">16</option>
      <option value="24">24</option>
    </Form.Select>
  );
};

export default CoreSelect;
