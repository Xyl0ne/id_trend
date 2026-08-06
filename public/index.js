// Load student information
document.getElementById("name").textContent =
    localStorage.getItem("studentName") || "Unknown Student";

document.getElementById("program").textContent =
    localStorage.getItem("program") || "";

document.getElementById("most").textContent =
    localStorage.getItem("mostSaidLine") || "";

// Load profile image
const image = localStorage.getItem("userImage");

if (image) {
    document.getElementById("profile").src = image;
}

// Load Spotify information
document.getElementById("songTitle").textContent =
    localStorage.getItem("songTitle") || "Song Name";

document.getElementById("artistName").textContent =
    localStorage.getItem("songArtist") || "Artist";

const cover = localStorage.getItem("albumCover");

if (cover) {
    document.getElementById("songImage").src = cover;
}