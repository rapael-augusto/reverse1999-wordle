import api from "./apiService";

export class CharacterService {
  async getAllCharactersNames() {
    const response = await api.get("/characters");
    return response.data;
  }

  async dailyGuess(slug: string) {
    const response = await api.post("/guess", { slug });
    return response.data;
  }
}
