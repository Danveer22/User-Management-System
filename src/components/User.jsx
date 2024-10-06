import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const Container = styled.div`
  padding: 2rem 4rem;
  background-color: #f4f6f8;
  color: #333;
  height: 100vh;
  overflow-y: auto;
`;

const UserDetails = styled.div`
  background-color: white;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 600px;
  margin: 8rem auto;

  h2 {
    margin-bottom: 2rem;
    color: #4a90e2;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.8rem;
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

const ButtonBack = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background-color: #357ab7;
  }
`;

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, isLoading } = useUsers();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundUser = users.find((user) => user.id === parseInt(id));
    if (foundUser) {
      setUser(foundUser);
    } else {
      setError("User not found");
    }
  }, [id, users]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      {user && (
        <UserDetails>
          <h2>{user.name}'s Details</h2>
          <p>
            <strong>Username:</strong> {user.username || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || "N/A"}
          </p>
          <p>
            <strong>City:</strong> {user.address.city || "N/A"}
          </p>
          <p>
            <strong>Street:</strong> {user.address.street || "N/A"}
          </p>
          <p>
            <strong>Suite:</strong> {user.address.suite || "N/A"}
          </p>
          <p>
            <strong>Zip Code:</strong> {user.address.zipcode || "N/A"}
          </p>
          <p>
            <strong>Website:</strong> {user.website || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {user.company.name || "N/A"}
          </p>
          <ButtonBack
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            BACK
          </ButtonBack>
        </UserDetails>
      )}
    </Container>
  );
}

export default User;
