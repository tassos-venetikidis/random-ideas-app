import axios from "axios";

class IdeasApi {
  constructor() {
    this._apiUrl = "http://localhost:5000/api/ideas";
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }

  getIdea(id) {
    return axios.get(`${this._apiUrl}/${id}`);
  }

  createIdea(ideaObj) {
    return axios.post(this._apiUrl, ideaObj);
  }

  updateIdea(id, idea) {
    return axios.put(`${this._apiUrl}/${id}`, idea);
  }

  deleteIdea(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username,
      },
    });
  }
}

export default new IdeasApi();
