import * as actionType from "./phonebook.action";

const initialState = {
  contactList: [],
};

export const phonebookReducer = (state = initialState, actionType) => {
  switch (actionType.type) {
    case "POST_CONTACT":
      return {
        ...state,
        contactList: actionType.result,
      };
    default:
      return state;
  }
};

export default phonebookReducer;
