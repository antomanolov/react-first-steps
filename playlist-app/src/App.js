import { useState } from "react";

const initialUsers = [
    { name: "Anton", albums: [], avatar: "", likedSongs: 0, id: 0 },
];

const initialAlbums = [
    {
        name: "Ride the Lighning",
        artist: "Metallica",
        songs: [
            { name: "Fight Fire with Fire", liked: false },
            { name: "Ride the Lightning", liked: false },
            { name: "For Whom the Bell Tolls", liked: false },
            { name: "Fade to Black", liked: false },
            { name: "Trapped Under Ice", liked: false },
            { name: "Escape", liked: false },
            { name: "Creeping Death", liked: false },
            { name: "The Call of Ktulu", liked: false },
        ],
        year: 1984,
        img: "https://upload.wikimedia.org/wikipedia/en/f/f4/Ridetl.png",
    },
    {
        name: "Bloody Kisses",
        artist: "Type O Negative",
        songs: [
            { name: "Machine Screw", liked: false },
            { name: "Christian Woman", liked: false },
            { name: "Black No. 1", liked: false },
            { name: "Fay Wray Come Out and Play", liked: false },
            { name: "Set me on Fire", liked: false },
            { name: "WE Hate Everyone", liked: false },
            { name: "Bloody Kisses", liked: false },
            { name: "Too late: Frozen", liked: false },
        ],
        year: 1993,
        img: "https://upload.wikimedia.org/wikipedia/en/f/f7/Bloodykiss.jpg",
    },
];

export default function App() {
    const [showAlbums, setShowAlbums] = useState(true);
    function onClickButton() {
        setShowAlbums((prev) => !prev);
    }
    return (
        <div className="container">
            <Header />
            <div className="inner-container">
                <Users onClick={onClickButton} />
                {showAlbums && <Albums />}
            </div>
        </div>
    );
}

function Header() {
    return <h1 className="header-title">Music playlist🎧️</h1>;
}

function Button({ onClick }) {
    return (
        <button className="btn" onClick={() => onClick()}>
            Show albums
        </button>
    );
}

function Users({ onClick }) {
    return (
        <ul className="users">
            {initialUsers.map((user) => (
                <User key={user.id} user={user} onClick={onClick} />
            ))}
        </ul>
    );
}

function User({ user, onClick }) {
    return (
        <li className="user">
            <h3>🎶 {user.name}</h3>
            <p>Liked songs: {user.likedSongs}</p>
            <Button onClick={onClick} />
        </li>
    );
}

function Albums() {
    return (
        <ul className="albums">
            {initialAlbums.map((album) => (
                <Album key={album.name} album={album} />
            ))}
        </ul>
    );
}

function Album({ album }) {
    return (
        <li className="album">
            <img src={album.img} alt={`${album.name} cover`} />
            <h3>{album.name}</h3>
            <h4>by</h4>
            <h2>{album.artist}</h2>
            {album.songs.map((song) => (
                <Song key={song.name} song={song} id={album.name} />
            ))}
        </li>
    );
}

function Song({ song, id }) {
    const [isLiked, setIsLiked] = useState(song.liked);
    const [likedSongs, setLikedSongs] = useState(initialAlbums);

    // make set function for setIsLiked!!!!!!!!
    function likeSong(albumName, songName) {
        
        const newLiked = likedSongs.map((album) =>
            album.name === albumName
                ? {
                      ...album,
                      songs: album.songs.map((song) =>
                          song.name === songName
                              ? { ...song, liked: isLiked ? false : true }
                              : song
                      ),
                  }
                : album
        );
        console.log(newLiked);
        setLikedSongs(newLiked);
    }

    return (
        <div className="song-like">
            <h5>-{song.name}</h5>
            <span
                onClick={() => {
                    likeSong(id, song.name);
                }}
            >
                {isLiked ? "❤️" : "🖤"}
            </span>
        </div>
    );
}
