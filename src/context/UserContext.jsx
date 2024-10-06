import { createContext, useReducer, useEffect, useContext } from "react";

const UserContext = createContext();

const BASE_URL = "https://jsonplaceholder.typicode.com";

const initialState = {
  users: [],
  isLoading: false,
  isModalOpen: false,
  isEditModalOpen: false,
  userToEdit: null,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "users/loaded":
      return { ...state, isLoading: false, users: action.payload };

    case "users/modal":
      return { ...state, isLoading: false, isModalOpen: !state.isModalOpen };
    case "users/modalEdit":
      return {
        ...state,
        isLoading: false,
        isEditModalOpen: !state.isEditModalOpen,
        userToEdit: action.payload || null,
      };
    case "users/created":
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload],
      };
    case "users/updated":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "users/delete":
      return {
        ...state,
        isLoading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function UserProvider({ children }) {
  const [
    { users, isLoading, isModalOpen, isEditModalOpen, userToEdit },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchUsers() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        dispatch({ type: "users/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchUsers();
  }, []);

  async function createUser(user) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "users/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function editUser(id, updatedUser) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      console.log("updatedData", data);
      dispatch({ type: "users/updated", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function deleteUser(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "users/delete", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        isModalOpen,
        isEditModalOpen,
        dispatch,
        createUser,
        deleteUser,
        editUser,
        userToEdit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUsers };
