(function () {
  "use strict";

  var form = document.getElementById("story-form");
  var nameInput = document.getElementById("name");
  var placeInput = document.getElementById("place");
  var fearInput = document.getElementById("fear");
  var errorEl = document.getElementById("error");

  var book = document.getElementById("book");
  var titleEl = document.getElementById("story-title");
  var bodyEl = document.getElementById("story-body");
  var endingsEl = document.getElementById("endings");
  var endingTextEl = document.getElementById("ending-text");
  var statusEl = document.getElementById("status");

  var copyBtn = document.getElementById("copy");
  var downloadBtn = document.getElementById("download");
  var againBtn = document.getElementById("again");

  var currentStory = null;
  var chosenEnding = null;

  function setStatus(message) {
    statusEl.textContent = message;
    if (message) {
      setTimeout(function () {
        if (statusEl.textContent === message) statusEl.textContent = "";
      }, 2500);
    }
  }

  function fullText() {
    if (!currentStory) return "";
    var parts = [currentStory.title, ""].concat(currentStory.paragraphs);
    if (chosenEnding) parts.push("", chosenEnding.text);
    return parts.join("\n\n").replace(/\n\n\n\n/g, "\n\n");
  }

  function renderEndings() {
    endingsEl.innerHTML = "";
    endingTextEl.textContent = "";
    chosenEnding = null;

    currentStory.endings.forEach(function (ending) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.textContent = ending.label;
      btn.addEventListener("click", function () {
        chosenEnding = ending;
        endingTextEl.textContent = ending.text;
      });
      endingsEl.appendChild(btn);
    });
  }

  function renderStory(fear) {
    titleEl.textContent = currentStory.title;
    bodyEl.innerHTML = "";

    currentStory.paragraphs.forEach(function (text, index) {
      var p = document.createElement("p");
      p.textContent = text;
      p.style.animationDelay = (index * 0.7) + "s";
      bodyEl.appendChild(p);
    });

    renderEndings();

        book.dataset.fear = fear;
    book.classList.toggle("extreme", fear === "extreme");
    book.hidden = false;


    document.body.classList.remove("shake");
    if (fear === "extreme") {
      void document.body.offsetWidth;
      document.body.classList.add("shake");
    }

    book.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function generate() {
    var name = nameInput.value.trim();
    var place = placeInput.value.trim();
    var fear = fearInput.value;

    if (!name) {
      errorEl.textContent = "Enter your name first.";
      nameInput.focus();
      return;
    }
    if (!place) {
      errorEl.textContent = "Enter a place first.";
      placeInput.focus();
      return;
    }

    errorEl.textContent = "";
    currentStory = window.GhostStories.build(name, place, fear);
    renderStory(fear);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(area);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    generate();
  });

  nameInput.addEventListener("input", function () { errorEl.textContent = ""; });
  placeInput.addEventListener("input", function () { errorEl.textContent = ""; });

  againBtn.addEventListener("click", generate);

  copyBtn.addEventListener("click", function () {
    if (!currentStory) return;
    copyText(fullText()).then(
      function () { setStatus("Story copied."); },
      function () { setStatus("Couldn't copy. Select the text and copy it manually."); }
    );
  });

  downloadBtn.addEventListener("click", function () {
    if (!currentStory) return;
    var blob = new Blob([fullText()], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "ghosthost-story.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatus("Story downloaded.");
  });
})();