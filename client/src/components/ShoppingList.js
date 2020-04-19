import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

import { connect } from "react-redux";
//action creator
import { deleteItems, getItems } from "../actions/itemAction";

const ShoppingList = ({ item: { items }, deleteItems, getItems, auth }) => {
  //console.log("Props", items);
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div>
      <Container>
        <ListGroup>
          {items.length !== 0
            ? items.map(({ _id, name }) => (
                <ListGroupItem key={_id}>
                  {auth ? (
                    <Button onClick={() => deleteItems(_id)}>&times;</Button>
                  ) : null}

                  {`id:${_id} name:${name}`}
                </ListGroupItem>
              ))
            : "No Items. Login to add Items"}
        </ListGroup>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("stateFromList", state);
  return {
    item: state.item,
    auth: state.auth.userAuthenticated,
  };
};
export default connect(mapStateToProps, { deleteItems, getItems })(
  ShoppingList
);
