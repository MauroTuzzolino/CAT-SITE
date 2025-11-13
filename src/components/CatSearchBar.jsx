import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch, FaCat } from "react-icons/fa";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 4px solid #883c06ff;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  max-width: 90%;
  margin: auto;
  margin-bottom: 25px;
  background: #e0e0e0ff;
  &:focus-within {
    border-color: #883c06ff;
    box-shadow: 0 0 8px rgba(225, 102, 50, 0.5);
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  margin-left: 0.5rem;
  outline: none;
  &::placeholder {
    color: #aaa;
    font-family: "Comic Neue", cursive;
  }
`;

export default function CatSearchBar({ placeholder = "Search… feline!", onSearch }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };
  return (
    <SearchWrapper>
      <FaCat size={24} color="#692612ff" />
      <Input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
      <FaSearch size={20} color="#692612ff" />
    </SearchWrapper>
  );
}
