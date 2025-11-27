import IdeasApi from "../services/IdeasApi.js";
import IdeaList from "./IdeaList.js";

class IdeaForm {
  constructor() {
    this._formModal = document.getElementById("form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form" data-editid="">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${
              localStorage.getItem("username")
                ? localStorage.getItem("username")
                : ""
            }" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
    `;
    this._form = document.getElementById("idea-form");
    this.addEventListeners();
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.tag.value ||
      !this._form.elements.text.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all fields!");
      return;
    }

    localStorage.setItem("username", this._form.elements.username.value);

    const idea = {
      tag: this._form.elements.tag.value,
      text: this._form.elements.text.value,
      username: this._form.elements.username.value,
    };

    if (this._form.dataset.editid) {
      await IdeasApi.updateIdea(this._form.dataset.editid, idea);
      this._form.dataset.editid = "";
      this._ideaList.getIdeas();
    } else {
      const newIdea = await IdeasApi.createIdea(idea);
      this._ideaList.addIdeaToList(newIdea.data.data);
    }

    this._form.elements.tag.value = "";
    this._form.elements.text.value = "";
    this._form.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }
}

export default IdeaForm;
