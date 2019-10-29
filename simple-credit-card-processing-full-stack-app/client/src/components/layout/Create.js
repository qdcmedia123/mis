import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import luhn from "luhn";
import Read from "./Read";

function App(props) {
  const [items, setItem] = useState({});
  const [errors, setErrors] = useState({});

  const changeHandler = event => {
    const { name, value } = event.target;
    setItem({ ...items, [name]: value });
  };

  const submitHandler = e => {
    e.preventDefault();
    const { card_number } = items;
    var validCard = luhn.validate(card_number);

    if (!validCard) {
      setErrors({ ...errors, card_number: "Please enter valid card number." });
    } else {
      delete errors.card_number;
      setErrors({ errors });
    }

    axios
      .post("/api/crud/create", items)
      .then(function(res) {
        if (res.status === 200) {
          /*props.history.push('/?created=true');*/
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="container">
          <br />
          <h2 className="text-left">Credit Card System</h2>
          <h4 className="text-left text-secondary">Add Credit Card</h4>
          <form className="needs-validation" onSubmit={submitHandler}>
            <div className="form-row col-md-6 text-left">
              <div className="col-md-12 ">
                <label htmlFor="validationServer01">Name</label>
                <input
                  name="name"
                  onChange={changeHandler}
                  type="text"
                  className="form-control"
                  id="validationServer01"
                  placeholder="Name"
                  value={items.name || ""}
                  required
                  pattern="[A-Za-z ]{1,30}"
                />
              </div>

              <div className="col-md-12 ">
                <label htmlFor="validationServer02">Car Number</label>
                <input
                  name="card_number"
                  onChange={changeHandler}
                  value={items.card_number || ""}
                  type="number"
                  className="form-control"
                  id="validationServer02"
                  placeholder="Card Number..."
                  pattern="[0-9]{13,19}"
                  required
                  min={0}
                />

                {errors.card_number && (
                  <div className="text-danger"> {errors.card_number}</div>
                )}
              </div>

              <div className="col-md-12 ">
                <label htmlFor="validationServerUsername">Limit</label>
                <div className="input-group">
                  <input
                    name="limit"
                    onChange={changeHandler}
                    value={items.limit || ""}
                    type="number"
                    className="form-control"
                    id="validationServerUsername"
                    placeholder="Limit"
                    aria-describedby="inputGroupPrepend3"
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="col-md-12">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ marginTop: "20px" }}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <br />
          <h1 className="text-left"> Existing Cards </h1>
          <Read />
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
