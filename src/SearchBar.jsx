import { Input } from '@chakra-ui/react';

function SearchBar({ searchQuery, setSearchQuery }) {
  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <Input
      placeholder="Search characters..."
      size="lg"
      value={searchQuery}
      onChange={handleSearchInputChange}
    />
  );
}

export default SearchBar;
