const parseSchema = ({ JSONSchema }) => {
  console.log("debug JSON shcema", JSONSchema);
}

const handleSubmit = ({ schema }) => {
  console.log("debug submit", schema);
}

const test = () => {
  console.log("debug text");
}

console.log("hellow from index")

document.addEventListener("DOMContentLoaded", () => {
  console.log("debug", "content loaded")
  function setFormListener() {
    const form = document.getElementById("schemaForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData);
      handleSubmit({ schema: formValues })
    });
  }

  setFormListener();
});


test();
