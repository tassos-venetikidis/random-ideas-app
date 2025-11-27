import axios from "axios";

class IdeasApi {
  constructor() {
    this._apiUrl = "http://localhost:5000/api/ideas";
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }

  createIdea(ideaObj) {
    return axios.post(this._apiUrl, ideaObj);
  }
}

export default new IdeasApi();
