import api from "./apiService";

export class CharacterService {
  async getAllCharactersNames() {
    const response = await api.get("/characters");
    return response.data;
  }

  async getRandomId() {
    const response = await api.get("/characters/random-id");
    return response.data;
  }

  async dailyGuess(slug: string) {
    const response = await api.post("/guess", { slug });
    return response.data;
  }

  async idGuess(id: number, slug: string) {
    const response = await api.post(`/guess/${id}`, { slug });
    return response.data;
  }

  async getDailyResult() {
    const response = await api.get("/guess/daily-result");
    return response.data;
  }
}
