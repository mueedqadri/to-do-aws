import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ListElement from "./ListElement";
import AddListForm from "./AddListForm";
import { useNavigate } from "react-router-dom";

export default function ToDo() {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    fetch(`${process.env.REACT_APP_END_POINT}/tasks/fetch_all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setList(data);
      });
  };

  const addToDb = () => {
    fetch(`${process.env.REACT_APP_END_POINT}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({  description: newItem }),
    }).then((res) => {
      if (res.ok) {
        setNewItem("");
        getAllTasks();
        return res.json();
      }
    });
  };

  const callbackToSetNewItem = (event) => {
    setNewItem(event.target.value);
  };

  const logout = ()=>{
    localStorage.setItem('accessToken', '')
    localStorage.setItem('userId', '')
    navigate("/login")
  }

  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm mt-5 ">
            <ul className="list-group">
              {list && list.length > 0 ? (
                list.map((element, idx) => {
                  return (
                    <ListElement
                      title={element.description}
                      id={element.id}
                      key={idx}
                      createdAt={new Date(element.created_at)}
                      callbackGetAllTasks={getAllTasks}
                    />
                  );
                })
              ) : (
                <p>Start getting things done!</p>
              )}
            </ul>
            <AddListForm
              callbackToAdd={addToDb}
              callbackToSetNewItem={callbackToSetNewItem}
              newItemValue={newItem}
            />
          </div>
          <div className="col-sm d-flex justify-content-around align-items-start">
            <p className="mt-5 ">{localStorage.getItem('userId')}</p>
            <button
              type="button"
              onClick={logout}
              className="btn btn-success mt-5 "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
