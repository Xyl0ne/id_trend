// FORM ELEMENTS
const studentName = document.getElementById("studentName");
const program = document.getElementById("program");
const favoriteSong = document.getElementById("favoriteSong");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const mostSaidLine = document.getElementById("mostSaidLine");

// =========================
// IMAGE PREVIEW
// =========================
imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
    };

    reader.readAsDataURL(file);

});

// =========================
// SEARCH SONG
// =========================
async function searchSong() {

    const song = favoriteSong.value.trim();

    if (song === "") {
        alert("Please enter a song.");
        return;
    }

    try {

        const response = await fetch(
    `http://localhost:3000/search-song?q=${encodeURIComponent(song)}`
        );

        if (!response.ok) {
            throw new Error("Unable to search song.");
        }

        const data = await response.json();

        document.getElementById("songName").textContent = data.title;
        document.getElementById("artist").textContent = data.artist;
        document.getElementById("albumCover").src = data.cover;

        // Save for index.html
        localStorage.setItem("songTitle", data.title);
        localStorage.setItem("songArtist", data.artist);
        localStorage.setItem("albumCover", data.cover);

    } catch (error) {

        console.error(error);
        alert("Failed to fetch song information.");

    }

}
// =========================
// SUBMIT
// =========================
function onSubmit() {

    if (studentName.value.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("studentName", studentName.value);
    localStorage.setItem("program", program.value);
    localStorage.setItem("mostSaidLine", mostSaidLine.value);
    localStorage.setItem("favoriteSong", favoriteSong.value);

    const file = imageInput.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            localStorage.setItem("userImage", e.target.result);

            window.location.href = "card.html";

        };

        reader.readAsDataURL(file);

    } else {

        window.location.href = "card.html";

    }

}
