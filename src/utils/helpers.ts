import { Character } from "../types/character";
import { useCallback } from "react";

export const handleSelect = (
  character: Character,
  selected: Character[],
  setSelected: React.Dispatch<React.SetStateAction<Character[]>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setResults: React.Dispatch<React.SetStateAction<Character[]>>,
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>,
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    selected.some(selectedCharacter => selectedCharacter.id === character.id)
  ) {
    handleRemove(character, setSelected);
  } else {
    setSelected(prevSelected => [...prevSelected, character]);
  }
  setQuery("");
  setResults([]);
  setHighlightedIndex(-1);
  setIsDropdownOpen(false);
};

export const handleRemove = (
  character: Character,
  setSelected: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  setSelected(prev => prev.filter(c => c.id !== character.id));
};

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  results: Character[],
  highlightedIndex: number,
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>,
  handleSelect: (character: Character) => void,
  query: string,
  selected: Character[],
  setSelected: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  if (e.key === "ArrowDown") {
    setHighlightedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
  } else if (e.key === "ArrowUp") {
    setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
  } else if (e.key === "Enter" && highlightedIndex >= 0) {
    handleSelect(results[highlightedIndex]);
  } else if (e.key === "Backspace" && query === "" && selected.length > 0) {
    setSelected(selected.slice(0, -1));
  }
};

export const useLoadMore = (
  loading: boolean,
  page: number,
  totalPages: number,
  setPage: (page: any) => void
) => {
  return useCallback(() => {
    if (!loading && page < totalPages) {
      setPage((prevPage: number) => prevPage + 1); // prevPage parametresinin türünü belirtin
    }
  }, [loading, page, totalPages, setPage]);
};

export const useHandleScroll = (
  resultsContainerRef: React.RefObject<HTMLDivElement>,
  loadMore: () => void
) => {
  return useCallback(() => {
    const container = resultsContainerRef.current;
    if (
      container &&
      container.scrollTop + container.clientHeight === container.scrollHeight
    ) {
      loadMore();
    }
  }, [resultsContainerRef, loadMore]);
};
