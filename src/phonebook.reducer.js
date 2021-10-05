import * as actionType from "./phonebook.action";

const initialState = {
  contactList: [],
};

export const phonebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.POST_CONTACT:
      return {
        ...state,
        contactList: action.result,
      };
    default:
      return state;
  }
};

export default phonebookReducer;
