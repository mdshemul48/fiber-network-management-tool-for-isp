import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import useEditablePolyline from '../../../hooks/useEditablePolyline';
import usePolylines from '../../../hooks/usePolylines';
import axiosInstance from '../../../utility/axios';

const LocalFiberForm = ({ handleClose }) => {
  const { coordinates, reset, parent } = useEditablePolyline();
  const { setNewAddedPolyline } = usePolylines();

  const [formData, setFormData] = useState({
    name: '',
    coreCount: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, coreCount } = formData;

    const newConnection = {
      name: name,
      parent: parent._id,
      parentType: parent.type,
      totalCore: coreCount,
      coordinates,
    };

    toast.promise(
      axiosInstance.post('/local-fiber-connection', newConnection),
      {
        loading: () => 'Adding new company connection...',

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
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Modal.Body>
        <Form.Group className='mb-2'>
          <Form.Control
            type='text'
            placeholder='Name'
            name='name'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Select
            name='coreCount'
            defaultValue={'0'}
            onChange={handleChange}
          >
            <option value='0'>Select Fiber Core..</option>
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
  );
};

export default LocalFiberForm;
