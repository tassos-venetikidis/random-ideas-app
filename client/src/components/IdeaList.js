import IdeasApi from "../services/IdeasApi.js";
import Modal from "./Modal.js";

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
    this._ideaList.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const ideaCard = e.target.closest("div");
      if (e.target.classList.contains("fa-times")) {
        this.deleteIdea(ideaCard);
      } else if (e.target.classList.contains("edit")) {
        this.updateIdea(ideaCard);
      }
    });
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

  async deleteIdea(ideaCard) {
    try {
      const res = await IdeasApi.deleteIdea(ideaCard.dataset.id);
      this.getIdeas();
    } catch (e) {
      alert("You cannot delete this resource");
    }
  }

  async updateIdea(ideaCard) {
    try {
      const result = await IdeasApi.getIdea(ideaCard.dataset.id);
      const idea = result.data.data;
      new Modal().open();
      const form = document.getElementById("idea-form");
      form.elements.username.disabled = true;
      form.elements.text.value = idea.text;
      form.elements.tag.value = idea.tag;
      form.setAttribute("data-editid", idea._id);
    } catch (e) {
      console.log(e, "Something went wrong!");
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
            Posted on <span class="date">${idea.date.slice(0, 10)}</span> by
            <span class="author">${idea.username}</span>
          </p>
          ${
            idea.username === localStorage.getItem("username")
              ? "<button class='btn edit'>Edit</button>"
              : ""
          }
        </div>
      `;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
