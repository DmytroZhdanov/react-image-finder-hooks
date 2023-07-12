import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { Container, Input, SearchButton, SearchForm } from './Searchbar.styled';

export const Searchbar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const { value } = e.target.elements.searchQuery;
    const query = value.trim();

    if (query === '') {
      return;
    }

    onSearch(query);
  };

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  return (
    <Container>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ImSearch />
        </SearchButton>
        <Input
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleInputChange}
        />
      </SearchForm>
    </Container>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
