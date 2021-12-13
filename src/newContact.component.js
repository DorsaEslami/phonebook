/* #region  [- import -] */
import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Container,
} from "reactstrap";
import { postContact } from "./phonebook.action";
/* #endregion */

const NewContact = (props) => {
  /* #region  [- useDispatch -] */
  const dispatch = useDispatch();
  /* #endregion */

  /* #region  [- useSelector -] */
  const contactList = useSelector((state) => state.phonebook.contactList);
  /* #endregion */

  /* #region  [- componentFields -] */
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  /* #endregion */

  /* #endregion */

  /* #region  [- handleChange -] */

  /* #region  [- handleChange -] */
  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "phoneNumber":
        setPhoneNumber(event.target.value);
        break;
      default:
        break;
    }
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- buttons -] */

  const save = async () => {
    let list = [...contactList];
    let obj = {
      id: Math.floor(Math.random() * 100),
      name: name,
      phoneNumber: phoneNumber,
    };
    list.push(obj);
    await dispatch(postContact(list));
    cancel();
  };
  /* #region  [- cancel -] */
  const cancel = async () => {
    await props.onCloseDrawer();
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- render -] */

  return (
    <Container
      style={{ textAlign: "left", padding: "2% 2% 0 2%", width: "99%" }}
    >
      <Row name="form" style={{ height: "83vh" }}>
        <Col sm="9" md="9" lg="9">
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Phone Number</Label>
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>

      <Row
        name="buttons"
        style={{ height: "7vh", paddingBottom: "0", alignItems: "center" }}
      >
        <Col sm="12" md="12" lg="12">
          <Button
            color="primary"
            style={{ marginLeft: "2%", fontSize: "10px" }}
            onClick={save}
          >
            Save
          </Button>
          <Button
            color="secondary"
            style={{ marginLeft: "4px", fontSize: "10px" }}
            onClick={cancel}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );

  /* #endregion */
};

export default NewContact;
