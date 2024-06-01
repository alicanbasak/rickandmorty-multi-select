// api/character.ts
import httpClient from "../utils/httpClient";
import { Character } from "../types/character";

export const fetchCharacters = async (
  query: string,
  page: number
): Promise<{ characters: Character[]; totalPages: number }> => {
  try {
    const response = await httpClient.get<any>(
      `/character/?name=${query}&page=${page}`
    );
    const characters = response.data.results;

    const charactersWithEpisodes = characters.map((character: Character) => ({
      id: character.id,
      name: character.name,
      image: character.image,
      episode: character.episode.length,
    }));

    const totalPages = response.data.info.pages;

    return { characters: charactersWithEpisodes, totalPages };
  } catch (error) {
    throw new Error("Failed to fetch characters.");
  }
};
