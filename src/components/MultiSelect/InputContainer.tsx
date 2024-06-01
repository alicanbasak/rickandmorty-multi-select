import React from "react";
import { Character } from "../../types/character";
import { handleKeyDown, handleRemove } from "../../utils/helpers";
import { handleSelect } from "../../utils/helpers"; // Import handleSelect

const InputContainer: React.FC<{
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
  selected: Character[];
  setSelected: React.Dispatch<React.SetStateAction<Character[]>>;
  results: Character[];
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  setResults: React.Dispatch<React.SetStateAction<Character[]>>; // Add setResults
}> = ({
  query,
  setQuery,
  setPage,
  setIsDropdownOpen,
  inputRef,
  selected,
  setSelected,
  results,
  highlightedIndex,
  setHighlightedIndex,
  setResults, // Add setResults
}) => {
  return (
    <div className="multi-select-input-wrapper">
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setPage(1);
            setIsDropdownOpen(true);
          }}
          onKeyDown={e =>
            handleKeyDown(
              e,
              results,
              highlightedIndex,
              setHighlightedIndex,
              character =>
                handleSelect(
                  character,
                  selected,
                  setSelected,
                  setQuery,
                  setResults, // Use setResults
                  setHighlightedIndex,
                  setIsDropdownOpen
                ),
              query,
              selected,
              setSelected
            )
          }
          placeholder="Search characters"
          ref={inputRef}
          className="multi-select-input"
        />
        <div
          className="input-icon"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
              setIsDropdownOpen(prevState => !prevState);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
              fill="rgba(0, 0, 0, 0.54)"
            />
          </svg>
        </div>
      </div>
      <div className="selected-tags-container">
        {selected.map(character => (
          <div key={character.id} className="selected-tag">
            <span>{character.name}</span>
            <button onClick={() => handleRemove(character, setSelected)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputContainer;
