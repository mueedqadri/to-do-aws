import React, { useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [message , setMessage] = useState("");

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const onSubmit = () => {
    fetch(`https://461pqukfhe.execute-api.us-east-1.amazonaws.com/feedback`, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain',
        },
        body: feedback,
      }).then((response) => {
        if (response.status == 200) {
            setMessage('Feedback Sent Successfully!')
      }});
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm mt-5">
            <form>
              <h3>Feedback</h3>
              <h5 style={{color: 'green'}}>{message}</h5>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Example textarea
                </label>
                <textarea onChange={handleChange}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={onSubmit}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </div>
  );
}
