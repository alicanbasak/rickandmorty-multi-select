import React from "react";
import { Character } from "../../types/character";
import DropdownItem from "./DropdownItem";

const Dropdown: React.FC<{
  loading: boolean;
  isDropdownOpen: boolean;
  results: Character[];
  resultRefs: React.RefObject<(HTMLDivElement | null)[]>;
  highlightedIndex: number;
  handleSelect: Function;
  selected: Character[];
  setSelected: React.Dispatch<React.SetStateAction<Character[]>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<Character[]>>;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLoadMoreClick: () => void;
  resultsContainerRef: React.RefObject<HTMLDivElement>;
  query: string;
}> = ({
  loading,
  isDropdownOpen,
  results,
  resultRefs,
  highlightedIndex,
  handleSelect,
  selected,
  setSelected,
  setQuery,
  setResults,
  setHighlightedIndex,
  setIsDropdownOpen,
  handleLoadMoreClick,
  resultsContainerRef,
  query,
}) => {
  return (
    <div className="results-container" ref={resultsContainerRef}>
      <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
        {isDropdownOpen && (
          <>
            {results.map((character, index) => (
              <DropdownItem
                key={character.id}
                character={character}
                index={index}
                highlightedIndex={highlightedIndex}
                handleSelect={handleSelect}
                selected={selected}
                setSelected={setSelected}
                setQuery={setQuery}
                setResults={setResults}
                setHighlightedIndex={setHighlightedIndex}
                setIsDropdownOpen={setIsDropdownOpen}
                query={query}
                ref={el => {
                  if (el && resultRefs.current) {
                    resultRefs.current[index] = el;
                  }
                }}
              />
            ))}
            <div className="load-more">
              <button className="btn" onClick={handleLoadMoreClick}>
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
