import React, { useState, useEffect, useRef } from "react";
import "./MultiSelect.css";
import { Character } from "../../types/character";
import { fetchCharacters } from "../../api/character";
import InputContainer from "./InputContainer";
import Dropdown from "./Dropdown";
import {
  useLoadMore,
  useHandleScroll,
  handleSelect,
} from "../../utils/helpers";

const MultiSelectContainer: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Character[]>([]);
  const [selected, setSelected] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const loadMore = useLoadMore(loading, page, totalPages, setPage);
  const handleScroll = useHandleScroll(resultsContainerRef, loadMore);

  useEffect(() => {
    const container = resultsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  useEffect(() => {
    const fetchAndSetCharacters = async () => {
      setLoading(true);
      try {
        const { characters, totalPages } = await fetchCharacters(query, page);
        const filteredCharacters = characters.filter(character =>
          character.name.toLowerCase().includes(query.toLowerCase())
        );
        if (filteredCharacters.length === 0 && query !== "") {
          setResults([]);
        } else {
          setResults(prevResults =>
            page === 1
              ? filteredCharacters
              : [...prevResults, ...filteredCharacters]
          );
          setTotalPages(totalPages);
          setError(null);
        }
      } catch (error) {
        setResults([]);
        setError("An error occurred while fetching characters.");
      } finally {
        setLoading(false);
      }
    };

    if (isDropdownOpen) {
      fetchAndSetCharacters();
    }
  }, [query, page, isDropdownOpen]);

  useEffect(() => {
    if (highlightedIndex >= 0 && resultRefs.current[highlightedIndex]) {
      resultRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    setIsDropdownOpen(results.length > 0);
  }, [results]);

  const handleLoadMoreClick = () => {
    loadMore();
  };

  return (
    <div className="multi-select-container">
      <InputContainer
        query={query}
        setQuery={setQuery}
        setPage={setPage}
        setIsDropdownOpen={setIsDropdownOpen}
        inputRef={inputRef}
        selected={selected}
        setSelected={setSelected}
        results={results}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        setResults={setResults} // Pass setResults
      />
      <Dropdown
        loading={loading}
        isDropdownOpen={isDropdownOpen}
        results={results}
        resultRefs={resultRefs}
        highlightedIndex={highlightedIndex}
        handleSelect={handleSelect}
        selected={selected}
        setSelected={setSelected}
        setQuery={setQuery}
        setResults={setResults}
        setHighlightedIndex={setHighlightedIndex}
        setIsDropdownOpen={setIsDropdownOpen}
        handleLoadMoreClick={handleLoadMoreClick}
        resultsContainerRef={resultsContainerRef}
        query={query}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MultiSelectContainer;
