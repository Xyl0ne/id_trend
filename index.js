require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve HTML, CSS, JS from /public
app.get("/", (req, res) => {
    res.redirect("/form.html");
});
// =======================
// HOME
// =======================
app.get("/", (req, res) => {
    res.send("Spotify API Server is running.");
});

// =======================
// SEARCH SONG
// =======================
app.get("/search-song", async (req, res) => {

    const query = req.query.q;

    if (!query) {
        return res.status(400).json({
            error: "Song name is required."
        });
    }

    try {

        const response = await axios.get(
            "https://spotify23.p.rapidapi.com/search/",
            {
                params: {
                    q: query,
                    type: "tracks",
                    offset: "0",
                    limit: "1",
                    numberOfTopResults: "1"
                },
                headers: {
                    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                    "x-rapidapi-host": process.env.RAPIDAPI_HOST
                }
            }
        );

        const items = response.data?.tracks?.items;

        if (!items || items.length === 0) {
            return res.status(404).json({
                error: "Song not found."
            });
        }

        const track = items[0].data;

        const song = {
            title: track.name,
            artist: track.artists.items
                .map(a => a.profile.name)
                .join(", "),
            album: track.albumOfTrack.name,
            cover: track.albumOfTrack.coverArt?.sources?.[0]?.url || "",
            spotifyUrl: track.uri
        };

        res.json(song);

    } catch (error) {

        console.error("Spotify API Error:");

        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        res.status(500).json({
            error: "Failed to fetch song information."
        });

    }

});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});