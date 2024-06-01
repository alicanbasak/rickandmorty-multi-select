import React, { forwardRef } from "react";
import { Character } from "../../types/character";
import { highlightText } from "../../utils/highlightText";

const DropdownItem = forwardRef<
  HTMLDivElement,
  {
    character: Character;
    index: number;
    highlightedIndex: number;
    handleSelect: Function;
    selected: Character[];
    setSelected: React.Dispatch<React.SetStateAction<Character[]>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setResults: React.Dispatch<React.SetStateAction<Character[]>>;
    setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    query: string;
  }
>(
  (
    {
      character,
      index,
      highlightedIndex,
      handleSelect,
      selected,
      setSelected,
      setQuery,
      setResults,
      setHighlightedIndex,
      setIsDropdownOpen,
      query,
    },
    ref
  ) => {
    return (
      <div
        className={`dropdown-item ${
          index === highlightedIndex ? "highlighted" : ""
        }`}
        onClick={() => {
          handleSelect(
            character,
            selected,
            setSelected,
            setQuery,
            setResults,
            setHighlightedIndex,
            setIsDropdownOpen
          );
        }}
        ref={ref}
      >
        <input
          type="checkbox"
          checked={selected.some(
            selectedCharacter => selectedCharacter.id === character.id
          )}
          readOnly
        />
        <img src={character.image} alt={character.name} />
        <div className="dropdown-character-info">
          <div className="dropdown-character-name">
            {highlightText(character.name, query)}
          </div>
          <div className="dropdown-character-episodes">
            {character.episode} episodes
          </div>
        </div>
      </div>
    );
  }
);

export default DropdownItem;
