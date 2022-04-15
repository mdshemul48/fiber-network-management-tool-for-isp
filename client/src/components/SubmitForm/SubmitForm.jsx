import React from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import useEditablePolyline from '../../hooks/useEditablePolyline';
import CompanyForm from './Forms/CompanyForm';
import PointToPointForm from './Forms/PointToPointForm';

const SubmitForm = ({ show, handleClose }) => {
  const { parent, coordinates } = useEditablePolyline();
  if (!parent && coordinates.length > 1) {
    return (
      <PointToPointForm parent={parent} show={show} handleClose={handleClose} />
    );
  } else if (parent?.type === 'pointToPoint' && coordinates.length > 1) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Tabs defaultActiveKey='reseller' className='mt-1 mx-2'>
          <Tab eventKey='reseller' title='Reseller'></Tab>
          <Tab eventKey='company' title='Company'>
            <CompanyForm
              parent={parent}
              show={show}
              handleClose={handleClose}
            />
          </Tab>
        </Tabs>
      </Modal>
    );
  }

  return <div></div>;
};

export default SubmitForm;
