import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useEditablePolyline from '../../../hooks/useEditablePolyline';
import usePolylines from '../../../hooks/usePolylines';

import allCoreColor from '../../../utility/coreColor';

const ResellerForm = ({ handleClose }) => {
  const { coordinates, reset, parent } = useEditablePolyline();
  const { setNewAddedPolyline } = usePolylines();
  const [formData, setFormData] = useState({
    name: '',
    oltSerialNumber: '',
    portNo: '',
    oltType: '',
    color: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const coreColors = allCoreColor.slice(0, parent.totalCore);
  const colors = coreColors.map((item) => {
    const foundedColor = parent.childrens.find((child) => {
      return child.color === item.colorName;
    });
    if (foundedColor) {
      return null;
    }
    return <option value={item.colorName}>{item.colorName}</option>;
  });

  console.log(formData);

  return (
    <>
      <Form onSubmit={'handleSubmit'}>
        <Modal.Body>
          <Form.Group className='mb-2'>
            <Form.Control
              type='text'
              placeholder='Name'
              name='name'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Control
              type='text'
              placeholder='Olt Serial Number'
              name='oltSerialNumber'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Control
              type='text'
              placeholder='Port No'
              name='portNo'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Check
              type='radio'
              label='EPON'
              value='epon'
              name='oltType'
              onChange={handleChange}
            />
            <Form.Check
              type='radio'
              label='GPON'
              value='gpon'
              name='oltType'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-1'>
            <Form.Label>Select Fiber Core</Form.Label>
            <Form.Select
              name='color'
              defaultValue={'0'}
              onChange={handleChange}
            >
              <option value='0'>Choose...</option>
              {colors}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default ResellerForm;
