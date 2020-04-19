import React, { useState } from "react";

import { connect } from "react-redux";
import { addItems } from "../actions/itemAction";

const FormModal = ({ addItems, auth }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
    };
    addItems(newItem);
  };
  return (
    <div>
      {auth ? "Add an Item" : "Please Login to Add Items"}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button color="dark" style={{ marginTop: "2rem" }}>
          Add Item
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.userAuthenticated,
});

export default connect(mapStateToProps, { addItems })(FormModal);

/*import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItems } from "../actions/itemAction";

const FormModal = ({ addItems, auth }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => setModal(!modal);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
    };
    addItems(newItem);
    //close modal
    toggle();
  };
  return (
    <div>
      {auth ? (
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        "Please Login to Add Items"
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To ShoppingList</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button color="dark" style={{ marginTop: "2rem" }}>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};*/
