import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function ListElement(props) {
  const deleteItem = () => {
    fetch(`${process.env.REACT_APP_END_POINT}/tasks/delete/${props.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.ok) {
        props.callbackGetAllTasks();

        return res.json();
      }
    });
  };

  const getDate = () => {
    let date = props.createdAt
    return (
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2)
    );
  };
  return (
    <li className="list-group-item">
      <div className="container">
        <div className="row">
          <div className="col">
            <p>{props.title}</p>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end">
              <button
                onClick={deleteItem}
                type="button"
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="row">
            <div style={{color :'lightgray', fontSize:10}} className="col">{getDate()}</div>
          </div>
        </div>
      </div>
    </li>
  );
}
