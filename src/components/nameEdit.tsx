import React, { useState, ChangeEvent } from "react";

interface Props {
  initialUserName: string;
  editingName: string;
  onNameUpdated: ()=>any;
  onEditingNameUpdated: (newEditingName: string)=>any;
}

export const NameEditComponent = (props: Props) => {

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onEditingNameUpdated(e.target.value);
  };

  const onNameSubmit = (event: any): any => {
    props.onNameUpdated();
  };

  return (
    <>
      <label> Update name:</label>
      <input value={props.editingName} onChange={onChange} />
      <button onClick={onNameSubmit}>Change</button>
    </>
  );
};
