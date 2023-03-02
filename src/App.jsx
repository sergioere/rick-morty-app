import Characters from './Characters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, SimpleGrid, Spinner ,Center} from '@chakra-ui/react';
import SearchBar from './SearchBar';

import ReactPaginate from 'react-paginate';

import './App.css'

 
function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchQuery}`
        );
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentPage, searchQuery]);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage + 1);
  }

  return (

    <Center>
 <Box  mx="auto" p="6" >
      <Heading mb="6">Rick and Morty Characters</Heading>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <Spinner size="xl" />
      ) : (

        <>
        <ReactPaginate
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            disabledClassName="disabled"
          />
        <SimpleGrid columns={[1, 2, 3, 4]} gap="6" mt='5'>
          {characters.map((character) => (
            <Box
              key={character.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <img src={character.image} alt={character.name} />
              <Box p="6">
                <Box d="flex" alignItems="baseline">
                
                  <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {character.name}
                </Box>
                <Box
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="sm"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {character.species} - {character.gender}
                  </Box>

                </Box>

               
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <ReactPaginate
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            disabledClassName="disabled"
          />

</>


      )}
    </Box>
    </Center>
   
  );
}

export default App;


