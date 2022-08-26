import {} from "../../actions/admin/clients_actions";

const clients_reducer = (state, action) => {
  throw new Error(`No matching ${action.type} action`);
};

export default clients_reducer;
