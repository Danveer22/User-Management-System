import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useUsers } from "../context/UserContext";
import UserModal from "./UserModal";
import UserEditModal from "./UserEditModal";
import Spinner from "./Spinner";

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  gap: 2rem;
  background-color: #f4f6f8;
  color: #333;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;

  th {
    text-align: start;
    padding: 1rem;
    background-color: #4a90e2;
    color: white;
    font-weight: bold;
    border-bottom: 2px solid #ddd;
  }

  td {
    padding: 0.8rem;
    border-bottom: 1px solid #ddd;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #eef1f5;
  }

  a {
    color: #4a90e2;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #357ab7;
      text-decoration: underline;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    background-color: #4a90e2;
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #357ab7;
    }

    &:nth-child(2) {
      background-color: #e74c3c;

      &:hover {
        background-color: #c0392b;
      }
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const AddUser = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #27ae60;
  color: white;
  font-size: 1.6rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #229954;
  }
`;

const NoUsersMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

function HomePage() {
  const {
    users,
    isLoading,
    dispatch,
    isModalOpen,
    deleteUser,
    editUser,
    userToEdit,
    isEditModalOpen,
  } = useUsers();

  const handleCloseModal = () => {
    dispatch({ type: "users/modal" });
  };

  const handleCloseEditModal = () => {
    dispatch({ type: "users/modalEdit" });
  };

  if (isLoading)
    return (
      <SpinnerContainer>
        <Spinner />
        <p>Loading users...</p>
      </SpinnerContainer>
    );

  return (
    <Container>
      <h2>User Management System</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7">
                <NoUsersMessage>No users found</NoUsersMessage>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address.city}</td>
                <td>{user.website}</td>
                <td>
                  <Buttons>
                    <button
                      onClick={() =>
                        dispatch({ type: "users/modalEdit", payload: user })
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </Buttons>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <StyledDiv>
        <AddUser onClick={() => dispatch({ type: "users/modal" })}>
          Add User
        </AddUser>
      </StyledDiv>
      {isModalOpen && <UserModal onClose={handleCloseModal} />}
      {isEditModalOpen && (
        <UserEditModal onClose={handleCloseEditModal} userToEdit={userToEdit} />
      )}
    </Container>
  );
}

export default HomePage;
