import React from 'react';

function FormStatus(props) {

  const newCouple = props.newCouple;
  const handleNoteChange = props.handleNoteChange;
  return (
    <li>
      <label htmlFor="status">Status:</label>
      <select name="status" id="form-status" value={newCouple.status} onChange={handleNoteChange}>
        <option value="default">-----</option>
        <option value="On Going">On going</option>
        <option value="Finished">Finished</option>
        <option value="Canceled">Canceled</option>
      </select>
    </li>
  );
}

export default FormStatus;
