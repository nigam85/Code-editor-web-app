const codeDisplay = document.getElementById("code-display");
const copyButton = document.getElementById("copy-button");
const saveButton = document.getElementById("save-button");
const lockButton = document.getElementById("lock-button");
const removeButton = document.getElementById("remove-button");

let isLocked = false;

function loadCodeFromLocalStorage() {
  const codeToLoad = localStorage.getItem("editor-text");
  if (codeToLoad) {
    codeDisplay.textContent = codeToLoad;
  }
  localStorage.setItem("firstVisit", "true");
}

//Remove saved data from LocalStorage
removeButton.addEventListener("click", () => {
  if (localStorage.getItem("editor-text")) {
    localStorage.setItem("editor-text", "");
  }
});

// Add event listeners to buttons
copyButton.addEventListener("click", () => {
  let string = codeDisplay.textContent;
  if (string.trim() === "") {
    alert("Nothing to Copy, Enter Something");
    return;
  }
  navigator.clipboard
    .writeText(string)
    .then(() => {
      alert("Code copied!!!");
    })
    .catch((error) => {
      console.error("Copy failed: ", error);
    });
});

//Save the data to LocalStorage
saveButton.addEventListener("click", function () {
  // Get the text content of the code display
  const codeToSave = codeDisplay.textContent;
  if (codeToSave.trim() === "") {
    alert("Nothing to Save, Enter Something");
    return;
  }

  // Save the code to localStorage with the key 'editor-text'
  localStorage.setItem("editor-text", codeToSave);

  // Provide a confirmation to the user
  alert("Code saved successfully");
});

lockButton.addEventListener("click", () => {
  isLocked = !isLocked;
  codeDisplay.contentEditable = !isLocked;

  codeDisplay.style.whiteSpace = "pre-wrap";
  lockButton.textContent = isLocked ? "Unlock" : "Lock";
});

codeDisplay.addEventListener("keydown", (e) => {
  const selection = window.getSelection();
  if (e.key === "Tab") {
    e.preventDefault();
    const tabNode = document.createTextNode("  ");
    document.execCommand("insertText", false, tabNode.textContent);
  } else if (e.key === "{" || e.key === "(" || e.key === "[") {
    const keyNode = document.createTextNode(e.key);
    e.preventDefault();
    document.execCommand("insertText", false, keyNode.textContent);
    let s = "";
    if (e.key === "{") {
      s = "}";
    } else if (e.key === "[") {
      s = "]";
    } else {
      s = ")";
    }
    const closeNode = document.createTextNode(`\n\n${s}`);
    document.execCommand("insertText", false, closeNode.textContent);
  } else if (e.key === "<" || e.key === "'" || e.key === '"') {
    const keyNode = document.createTextNode(e.key);
    e.preventDefault();
    document.execCommand("insertText", false, keyNode.textContent);
    let s = "";
    if (e.key === "'") {
      s = "'";
    } else if (e.key === "<") {
      s = ">";
    } else {
      s = '"';
    }
    const closeNode = document.createTextNode(`${s}`);
    document.execCommand("insertText", false, closeNode.textContent);
  }
});

document.addEventListener("DOMContentLoaded", loadCodeFromLocalStorage);
document.addEventListener("DOMContentLoaded", () => codeDisplay.focus());

// Initial setup
lockButton.textContent = "Lock";