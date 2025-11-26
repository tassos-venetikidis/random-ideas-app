class IdeaList {
  constructor() {
    this._ideaList = document.getElementById("idea-list");
    this._ideasFromDB = [
      {
        id: 1,
        text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
        tag: "TECHNOLOGY",
        username: "Tony Stark",
        date: "January 1, 2022",
      },
      {
        id: 2,
        text: "Milk cartons that turn a different color the older that your milk is getting",
        tag: "INVENTIONS",
        username: "Steve Rogers",
        date: "January 1, 2022",
      },
      {
        id: 3,
        text: "ATM location app which lets you know where the closest ATM is and if it is in service",
        tag: "SOFTWARE",
        username: "Bruce Banner",
        date: "January 1, 2022",
      },
    ];
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    if (this._validTags.has(tag)) {
      return `tag-${tag}`;
    }
    return "";
  }

  render() {
    this._ideaList.innerHTML = this._ideasFromDB
      .map((idea) => {
        return `
      <div class="card">
          <button class="delete"><i class="fas fa-times"></i></button>
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${this.getTagClass(idea.tag)}">${idea.tag}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
      })
      .join("");
  }
}

export default IdeaList;
