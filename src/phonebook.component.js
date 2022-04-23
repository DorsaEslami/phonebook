/* #region  [- import -] */
import { React, PureComponent } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import {
  Row,
  Button,
  Navbar,
  NavbarBrand,
  Col,
  Label,
  Container,
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import NewContact from "./newContact.component";
import { postContact } from "./phonebook.action";
import EditContact from "./editContact.component";
import { ContactsFilled } from "@ant-design/icons";
/* #endregion */

class Phonebook extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);
    this.state = {
      /* #region  [- componentFields -] */
      drawerComponent: <div></div>,
      id: "",
      /* #endregion */

      /* #region  [- flags -] */
      isDrawerVisible: false,
      isDrawerDestroyed: true,
      isEditDisabled: true,
      isDeleteDisabled: true,

      /* #endregion */

      /* #region  [- agGrid -] */
      columnDefs: [
        {
          field: "row",
          headerName: "Row",
          minWidth: 180,
          headerCheckboxSelection: false,
          checkboxSelection: true,
        },
        { field: "name", headerName: "Name" },
        { field: "phoneNumber", headerName: "Phone Number" },
      ],
      defaultColDef: {
        filter: true,
      },
      /* #endregion */
    };
  }
  /* #endregion */

  /* #region  [- onGridReady -] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };
  /* #endregion */

  /* #region  [- handleChange -] */

  /* #region  [- onSelectionChanged -] */
  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    let len = Object.keys(selectedRows).length;
    if (len === 0) {
      this.setState({
        id: "",
        isEditDisabled: true,
        isDeleteDisabled: true,
      });
    } else if (len === 1) {
      let id = selectedRows[0].id;
      this.setState({
        id: id,
        isEditDisabled: false,
        isDeleteDisabled: false,
      });
    }
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- buttons -] */

  /* #region   [- new -] */
  new = async () => {
    // let child = "";
    await this.setState({
      drawerComponent: (
        <NewContact
          onCloseDrawer={this.onCloseDrawer}
          // childRef={(ref) => (child = ref)}
        />
      ),
      isDrawerVisible: true,
      isDrawerDestroyed: false,
    });
    //  child.hi();
  };
  /* #endregion */

  /* #region   [- edit -] */
  edit = async () => {
    this.setState({
      drawerComponent: (
        <EditContact id={this.state.id} onCloseDrawer={this.onCloseDrawer} />
      ),
      isDrawerVisible: true,
      isDrawerDestroyed: false,
    });
  };
  /* #endregion */

  /* #region   [- delete -] */
  delete = async () => {
    let list = [
      ...this.props.contactList.filter((x) => x.id !== this.state.id),
    ];
    await this.props.postContact(list);
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- onCloseDrawer -] */
  onCloseDrawer = () => {
    this.setState({
      drawerComponent: <div></div>,
      isDrawerVisible: false,
      isDrawerDestroyed: true,
      id: "",
    });
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- render -] */
  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
      >
        <Row name="navbar" style={{ height: "7vh" }}>
          <Navbar color="dark" expand="md" style={{ height: "7vh" }}>
            <NavbarBrand style={{ padding: "2%", color: "gray" }} href="/">
              Home
            </NavbarBrand>
            <NavbarBrand style={{ padding: "2%", color: "gray" }} href="/">
              Contact us
            </NavbarBrand>
            <NavbarBrand style={{ padding: "2%", color: "gray" }} href="/">
              About us
            </NavbarBrand>
          </Navbar>
        </Row>

        <Row
          name="content"
          style={{
            height: "93vh",
            paddingTop: "2%",
            backgroundColor: "#dee2e6",
            textAlign: "left",
          }}
        >
          <Row name="header">
            <Col sm="12" md="12" lg="12" name="header">
              <Label
                style={{ paddingLeft: "2%", fontSize: "15px" }}
                for="phonebookHeader"
              >
                <ContactsFilled
                  style={{
                    color: "blue",
                    fontSize: "25px",
                    paddingRight: "2px",
                  }}
                />
                Phonebook
              </Label>
              <hr />
            </Col>
          </Row>

          <Row name="buttons">
            <Col sm="12" md="12" lg="12" name="header">
              <Button
                color="primary"
                style={{ marginLeft: "2%", fontSize: "10px" }}
                onClick={this.new}
              >
                New
              </Button>
              <Button
                disabled={this.state.isEditDisabled}
                color="primary"
                style={{ marginLeft: "2px", fontSize: "10px" }}
                onClick={this.edit}
              >
                Edit
              </Button>
              <Button
                disabled={this.state.isDeleteDisabled}
                color="primary"
                style={{ marginLeft: "2px", fontSize: "10px" }}
                onClick={this.delete}
              >
                Delete
              </Button>
            </Col>
          </Row>

          <Row name="grid" style={{ padding: "2%" }}>
            <div
              className="ag-theme-alpine"
              style={{ height: 400, width: "60%" }}
            >
              <AgGridReact
                rowSelection="single"
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                onGridReady={this.onGridReady}
                onSelectionChanged={this.onSelectionChanged}
                rowData={this.props.contactList}
              />
            </div>
          </Row>
        </Row>

        <Drawer
          title={this.state.id === "" ? "New Contact" : "Edit Contact"}
          placement="left"
          closable={true}
          maskClosable={false}
          onClose={this.onCloseDrawer}
          visible={this.state.isDrawerVisible}
          destroyOnClose={this.state.isDrawerDestroyed}
          width={500}
          style={{ padding: "0" }}
          bodyStyle={{ padding: "0" }}
        >
          {this.state.drawerComponent}
        </Drawer>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
