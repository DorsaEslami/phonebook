/* #region  [- import -] */
import { React, useState } from "react";
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
/* #endregion */

const Phonebook = (props) => {
  /* #region  [- componentFields -] */
  const [drawerComponent, setDrawerComponent] = useState(<div></div>);
  const [id, setId] = useState("");
  /* #endregion */

  /* #region  [- flags -] */
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDrawerDestroyed, setIsDrawerDestroyed] = useState(true);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  /* #endregion */

  /* #region  [- agGrid -] */
  const columnDefs = [
    {
      field: "row",
      headerName: "Row",
      minWidth: 180,
      headerCheckboxSelection: false,
      checkboxSelection: true,
    },
    { field: "name", headerName: "Name" },
    { field: "phoneNumber", headerName: "Phone Number" },
  ];
  const defaultColDef = {
    filter: true,
  };
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  /* #endregion */

  /* #region  [- onGridReady -] */
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  /* #endregion */

  /* #region  [- handleChange -] */

  /* #region  [- onSelectionChanged -] */
  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    let len = Object.keys(selectedRows).length;
    if (len === 0) {
      setIsDrawerVisible(false);
      setIsDrawerDestroyed(true);
      setId("");
    } else if (len === 1) {
      let id = selectedRows[0].id;
      setIsEditDisabled(false);
      setIsDeleteDisabled(false);
      setId(id);
    }
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- buttons -] */

  /* #region   [- new -] */
  const newContact = async () => {
    setDrawerComponent(<NewContact onCloseDrawer={onCloseDrawer} />);
    setIsDrawerVisible(true);
    setIsDrawerDestroyed(false);
  };
  /* #endregion */

  /* #region   [- edit -] */
  const edit = async () => {
    setDrawerComponent(<EditContact id={id} onCloseDrawer={onCloseDrawer} />);
    setIsDrawerVisible(true);
    setIsDrawerDestroyed(false);
  };
  /* #endregion */

  /* #region   [- delete -] */
  const deleteContact = async () => {
    let list = [...props.contactList.filter((x) => x.id !== id)];
    await props.postContact(list);
    gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- onCloseDrawer -] */
  const onCloseDrawer = () => {
    setDrawerComponent(<div></div>);
    setIsDrawerVisible(false);
    setIsDrawerDestroyed(true);
    setId("");
    gridApi.deselectAll();
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- render -] */

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
          <NavbarBrand style={{ padding: "2%" }} href="/">
            Home
          </NavbarBrand>
          <NavbarBrand style={{ padding: "2%" }} href="/">
            Contact us
          </NavbarBrand>
          <NavbarBrand style={{ padding: "2%" }} href="/">
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
            <Label style={{ paddingLeft: "2%" }} for="phonebookHeader">
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
              onClick={newContact}
            >
              New
            </Button>
            <Button
              disabled={isEditDisabled}
              color="primary"
              style={{ marginLeft: "2px", fontSize: "10px" }}
              onClick={edit}
            >
              Edit
            </Button>
            <Button
              disabled={isDeleteDisabled}
              color="primary"
              style={{ marginLeft: "2px", fontSize: "10px" }}
              onClick={deleteContact}
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
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              rowData={props.contactList}
            />
          </div>
        </Row>
      </Row>

      <Drawer
        title={id === "" ? "New Contact" : "Edit Contact"}
        placement="left"
        closable={true}
        maskClosable={false}
        onClose={onCloseDrawer}
        visible={isDrawerVisible}
        destroyOnClose={isDrawerDestroyed}
        width={500}
        style={{ padding: "0" }}
        bodyStyle={{ padding: "0" }}
      >
        {drawerComponent}
      </Drawer>
    </div>
  );

  /* #endregion */
};

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
