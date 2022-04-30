import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import useEditablePolyline from '../../../hooks/useEditablePolyline';
import usePolylines from '../../../hooks/usePolylines';

import allCoreColor from '../../../utility/coreColor';

const SplitterForm = ({ handleClose }) => {
  const { coordinates, reset, parent } = useEditablePolyline();
  const { setNewAddedPolyline } = usePolylines();

  const [formData, setFormData] = useState({
    name: '',
    OltPortNo: '',
    color: '',
    splitterType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getUnusedColor = () => {
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
    return colors;
  };

  return (
    <Form>
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
            placeholder='Olt Port No'
            name='OltPortNo'
            onChange={handleChange}
          />
        </Form.Group>

        {parent.type === 'localFiber' && (
          <Form.Group className='mb-1'>
            <Form.Label>Select Fiber Core</Form.Label>
            <Form.Select
              name='color'
              defaultValue={'0'}
              onChange={handleChange}
            >
              <option value='0'>Choose...</option>
              {getUnusedColor()}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Select
            defaultValue={'0'}
            onChange={handleChange}
            name='splitterType'
          >
            <option selected value='0'>
              Select Splitter Type
            </option>
            <option value='2'>1/2</option>
            <option value='4'>1/4</option>
            <option value='8'>1/8</option>
            <option value='16'>1/16</option>
            <option value='32'>1/32</option>
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
  );
};

export default SplitterForm;