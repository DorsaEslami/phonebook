/* #region  [- import -] */
import { React, PureComponent } from "react";
import { connect } from "react-redux";
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

class NewContact extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);
    this.state = {
      /* #region  [- componentFields -] */
      name: "",
      phoneNumber: "",
      /* #endregion */
    };
  }
  /* #endregion */

  /* #region  [- handleChange -] */

  /* #region  [- handleChange -] */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- buttons -] */

  save = async () => {
    let list = [...this.props.contactList];
    let obj = {
      id: Math.floor(Math.random() * 100),
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
    };
    list.push(obj);
    await this.props.postContact(list);
    this.cancel();
  };
  /* #region  [- cancel -] */
  cancel = async () => {
    await this.props.onCloseDrawer();
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- render -] */
  render() {
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
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Phone Number</Label>
                <Input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
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
              onClick={this.save}
            >
              Save
            </Button>
            <Button
              color="secondary"
              style={{ marginLeft: "4px", fontSize: "10px" }}
              onClick={this.cancel}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {
    contactList: state.phonebook.contactList,
  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => {
  return {
    postContact: (data) => dispatch(postContact(data)),
  };
};
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);
