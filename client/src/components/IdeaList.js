import IdeasApi from "../services/IdeasApi.js";

class IdeaList {
  constructor() {
    this._ideaList = document.getElementById("idea-list");
    this._ideasFromDB = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    this._ideaList.addEventListener("click", this.deleteIdea.bind(this));
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideasFromDB = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this._ideasFromDB.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    if (this._validTags.has(tag)) {
      return `tag-${tag}`;
    }
    return "";
  }

  async deleteIdea(e) {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "I") {
      e.stopImmediatePropagation();
      const ideaCard = e.target.closest("div");
      try {
        const res = await IdeasApi.deleteIdea(ideaCard.dataset.id);
        this.getIdeas();
      } catch (e) {
        alert("You cannot delete this resource");
      }
    }
  }

  render() {
    this._ideaList.innerHTML = this._ideasFromDB
      .map((idea) => {
        return `
      <div class="card" data-id="${idea._id}">
          <button class="delete" style="${
            idea.username !== localStorage.getItem("username") &&
            "display: none"
          }"><i class="fas fa-times"></i></button>
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${this.getTagClass(
            idea.tag
          )}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
