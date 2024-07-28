const { createStore } = require("redux");

// Actions
const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER = "UPDATE_USER";

const Add_user = task => ({ type: ADD_USER, payload: task });
const Remove_user = id => ({ type: REMOVE_USER, payload: id });
const Update_user = (id, newTask) => ({
  type: UPDATE_USER,
  payload: { id, newTask },
});

// Reducer
let nextId = 1;

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, { id: nextId++, task: action.payload }];
    case REMOVE_USER:
      return state.filter(todo => todo.id !== action.payload);
    case UPDATE_USER:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, task: action.payload.newTask }
          : todo
      );
    default:
      return state;
  }
};

// Store
const store = createStore(todoReducer);

const displayTodos = () => {
  console.log("Current Todos:", store.getState());
};

store.subscribe(displayTodos);

// Dispatching actions
store.dispatch(Add_user("SUYUNOV ILYOS"));
store.dispatch(Add_user("RAXMATOV MIRMANSUR"));
store.dispatch(Update_user(1, "SHOMURODOV MUHAMMAD AMIN"));
store.dispatch(Remove_user(2));
