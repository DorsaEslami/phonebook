export const POST_CONTACT = "POST_CONTACT";

export const postContact = (data) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: POST_CONTACT,
        result: data,
      });
    } catch (err) {
      throw err;
    }
  };
};
