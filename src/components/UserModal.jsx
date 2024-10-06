// UserModal.js
import { useState } from "react";
import styled from "styled-components";
import { useUsers } from "../context/UserContext";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 80rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #357ab7;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;

  border: none;
  color: #aaa;
  cursor: pointer;
`;

function UserModal({ onClose }) {
  const { createUser, users } = useUsers();
  const getNextUserId = () => {
    if (users.length === 0) return 1;
    const maxId = Math.max(...users.map((user) => user.id));
    return maxId + 1;
  };
  const [formData, setFormData] = useState({
    id: getNextUserId(),
    name: "",
    username: "",
    email: "",
    phone: "",
    address: { street: "", city: "" },
    website: "",
    company: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};

    if (!formData.name || formData.name.length < 3) {
      tempErrors.name = "Name is required and should be at least 3 characters.";
    }

    if (!formData.username || formData.username.length < 3) {
      tempErrors.username =
        "Username is required and must be at least 3 characters.";
    }

    if (!formData.email || formData.email.length < 5) {
      tempErrors.email = "Email is required and must be at least 5 characters.";
    }
    if (!formData.phone || formData.phone.length !== 10) {
      tempErrors.phone = "Phone is required and must be a 10-digit number.";
    }
    if (!formData.address.street) {
      tempErrors.street = "Street is required.";
    }
    if (!formData.address.city) {
      tempErrors.city = "City is required.";
    }
    if (formData.company && formData.company.length < 3) {
      tempErrors.company =
        "Company name must be at least 3 characters if provided.";
    }
    if (formData.website && formData.website.length < 5) {
      tempErrors.website = "Website must be at least 5 characters if provided.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name.split(".")[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createUser(formData);
      onClose();
    }
  };

  return (
    <ModalContainer>
      <FormContainer>
        <StyledDiv>
          <h3>Add New User</h3>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </StyledDiv>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>Street Address</Label>
            <Input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
            {errors.street && <ErrorMessage>{errors.street}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>City</Label>
            <Input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
            />
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>Company Name (optional)</Label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            {errors.company && <ErrorMessage>{errors.company}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>Website (optional)</Label>
            <Input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
            {errors.website && <ErrorMessage>{errors.website}</ErrorMessage>}
          </InputGroup>
          <Button type="submit">Create User</Button>
        </form>
      </FormContainer>
    </ModalContainer>
  );
}

export default UserModal;
