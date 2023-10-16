document.addEventListener("DOMContentLoaded", () => {
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
//   https://api.dictionaryapi.dev/api/v2/entries/en/hello
  const result = document.getElementById("result");
  const sound = document.getElementById("sound");
  const btn = document.getElementById("search-btn");

  btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.length > 0) {
          const wordData = data[0];
          if (wordData.meanings && wordData.meanings.length > 0) {
            const meaning = wordData.meanings[0];
            if (meaning.definitions && meaning.definitions.length > 0) {
              const definition = meaning.definitions[0];
              result.innerHTML = `
                <div class="word">
                  <h3>${inpWord}</h3>
                  <button onclick="playSound()">
             <i class=""></i>
                  </button>
                </div>
                <div class="details">
                  <p>${
                    meaning.partOfSpeech || "Part of speech not available"
                  }</p>
                  <p>/${
                    wordData.phonetic || "Phonetic transcription not available"
                  }/</p>
                </div>
                <p class="word-meaning">
                  ${definition.definition || "Definition not available"}
                </p>
                <p class="word-example">
                  ${definition.example || ""}
                </p>`;
              if (wordData.phonetics && wordData.phonetics.length > 0) {
                const audioSource = wordData.phonetics[0].audio;
                if (audioSource) {
                  // Correct the audio URL by removing the extra "https://"
                  sound.setAttribute(
                    "src",
                    audioSource.replace(/^https:\/\//, "")
                  );
                } else {
                  sound.setAttribute("src", ""); // No audio available
                }
              } else {
                sound.setAttribute("src", ""); // No audio available
              }
            } else {
              result.innerHTML = `<h3 class="error">No definition available for this word.</h3>`;
              sound.setAttribute("src", ""); // No audio available
            }
          } else {
            result.innerHTML = `<h3 class="error">No meanings available for this word.</h3>`;
            sound.setAttribute("src", ""); // No audio available
          }
        } else {
          result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
          sound.setAttribute("src", ""); // No audio available
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        result.innerHTML = `<h3 class="error">An error occurred. Please try again later.</h3>`;
        sound.setAttribute("src", ""); // No audio available
      });
  });
});

function playSound() {
  sound.play();
}
