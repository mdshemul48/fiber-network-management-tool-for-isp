import React from 'react';
import useEditablePolyline from '../../hooks/useEditablePolyline';
import PointToPointForm from './Forms/PointToPointForm';

const SubmitForm = ({ show, handleClose }) => {
  const { parent, coordinates } = useEditablePolyline();
  if (!parent && coordinates.length > 1) {
    return (
      <PointToPointForm parent={parent} show={show} handleClose={handleClose} />
    );
  }
  return <div></div>;
};

export default SubmitForm;
