const initialState = {
  // items: [{ id: uuidv4(), name: "dumbell" }]
  items: [],
  loading: false,
};
export const itemReducer = (state = initialState, action) => {
  //action vaneko component(reactApp) le k k action perfom garxa ta ?ani tyo action perform gare paxi state ma k k kura change hunxa or state bata k kura demand garxa ta ?
  //Action can be called as mediator between reducer and actual component
  //Uta bata aune jati kura sabai action.payload
  //Generally state lai update garne chij action creator bata aunxa jun component bata pass hunxa
  switch (action.type) {
    case "GET_ITEM":
      return {
        //to avoid state mutate(mutate i.e directly changing state)
        ...state, //more than one property
        items: action.payload,
      };
    case "ADD_ITEM": {
      return {
        ...state,
        items: [action.payload, ...state.items], //action.payload bata j aunxa tyo items array ma haldine
      };
    }
    case "DELETE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload), //item id uta bata pass hunxa
      };
    }
    case "ITEMS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    default:
      return state; //old state
  }
};
