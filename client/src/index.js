import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal.js";
import IdeaForm from "./components/IdeaForm.js";
import IdeaList from "./components/IdeaList.js";
import "./css/style.css";

const modal = new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
const ideaList = new IdeaList();
ideaList.render();
