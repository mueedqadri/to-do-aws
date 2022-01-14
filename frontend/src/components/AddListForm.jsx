import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function AddListForm(props) {
  return (
    <form className="row g-2 mt-5">
      <div className="col-auto ">
        <input
          type="text"
          className="form-control"
          value={props.newItemValue}
          id="listElement"
          placeholder="Type here...."
          onChange={props.callbackToSetNewItem}
        />
      </div>
      <div className="col-auto">
        <button
          type="button"
          onClick={props.callbackToAdd}
          className="btn btn-primary mb-3 "
        >
          Add
        </button>
      </div>
    </form>
  );
}
