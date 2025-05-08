let root = undefined;
const initializeTree = (value) => {
  root = { value, leftChild: undefined, rightChild: undefined };
};
const addLeaf = (value, localRoot) => {
  if (localRoot.value > value) {
    // left
    if (localRoot.leftChild) {
      addLeaf(value, localRoot.leftChild);
    } else {
      localRoot.leftChild = {
        value,
        leftChild: undefined,
        rightChild: undefined,
      };
      return;
    }
  } else {
    // right
    if (localRoot.rightChild) {
      addLeaf(value, localRoot.rightChild);
    } else {
      localRoot.rightChild = {
        value,
        leftChild: undefined,
        rightChild: undefined,
      };
      return;
    }
  }
};
const addElement = (value) => {
  if (!root) {
    initializeTree(value);
  } else {
    addLeaf(value, root);
  }
};
console.log("debug", "hello from tree")
document.addEventListener("DOMContentLoaded", () => {
  function setFormListener() {
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData);
      addElement(formValues["input"]);
      console.log(root);
    });
  }
  function numberValidation() {
    const input = document.getElementById("input");
    input.addEventListener("input", (e) => {
      const regex = new RegExp("^[0-9]+$|^[0-9]+(.[0-9]+)$");
      const value = e.target.value;
      console.log(value);
      if (regex.test(value)) {
        console.log("ok!");
        const error = document.getElementById("error");

        error && document.getElementById("label").removeChild(error);
        document.getElementById("input").classList.remove("error");
        document.getElementById("submit").removeAttribute("disabled");
      } else {
        console.log("nah!");
        const label = document.getElementById("label");
        const error = document.createElement("p");
        error.setAttribute("id", "error");
        error.innerHTML = "Not a valid number!!";
        label.appendChild(error);
        document.getElementById("input").classList.add("error");
        document.getElementById("submit").setAttribute("disabled", true);
      }
    });
  }
  setFormListener();
  numberValidation();
});
