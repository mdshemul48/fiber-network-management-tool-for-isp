import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axiosInstance from '../../../utility/axios';

import useEditablePolyline from '../../../hooks/useEditablePolyline';
import usePolylines from '../../../hooks/usePolylines';

const PointToPointForm = ({ show, handleClose }) => {
  const { coordinates, reset } = useEditablePolyline();
  const { setNewAddedPolyline } = usePolylines();

  const [formData, setFormData] = useState({
    name: '',
    coreCount: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, coreCount } = formData;

      const newPointToPointConnection = {
        name: name,
        totalCore: coreCount,
        coordinates,
      };

      await axiosInstance.post('/ptp-connection', newPointToPointConnection);
      toast.success('Point to Point Connection Created');
      setNewAddedPolyline(true);
      reset();
      handleClose();
    } catch (err) {
      const {
        data: { errors, message },
      } = err.response;
      if (errors) {
        errors.forEach((item) => {
          toast.error(item.msg);
        });
      }

      if (message) {
        toast.error(message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add pointToPoint Connection</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Enter Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Area Name'
              name='name'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Enter Fiber Core:</Form.Label>
            <Form.Select
              name='coreCount'
              defaultValue={'0'}
              onChange={handleChange}
            >
              <option value='0'>Choose...</option>
              <option value='2'>2</option>
              <option value='4'>4</option>
              <option value='8'>8</option>
              <option value='12'>12</option>
              <option value='16'>16</option>
              <option value='24'>24</option>
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
    </Modal>
  );
};

export default PointToPointForm;
