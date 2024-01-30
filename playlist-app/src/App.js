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
    const [showAlbums, setShowAlbums] = useState(false);
    const [likedSongs, setLikedSongs] = useState(initialAlbums);

    // form states
    const [albumName, setAlbumName] = useState("");

    // map all the functions to the buttons and make the form working!
    // const [albumCover, setAlbumCover] = useState("");
    // const [albumArtist, setAlbumArtist] = useState("");
    // const [song1, setSong1] = useState("");
    // const [song2, setSong2] = useState("");
    // const [song3, setSong3] = useState("");
    // const [song4, setSong4] = useState("");
    // const [song5, setSong5] = useState("");
    // const [song6, setSong6] = useState("");

    function onChangeAlbumName(e) {
        setAlbumName(e.target.value);
    }

    function onClickButton() {
        setShowAlbums((prev) => !prev);
    }
    return (
        <div className="container">
            <Header />
            <div className="inner-container">
                <div className="flex">
                    <Users onClick={onClickButton} lickedSongs={likedSongs} />
                    {showAlbums ? (
                        <AddAlbumForm
                            albumName={albumName}
                            onSetAlbumName={onChangeAlbumName}
                        />
                    ) : null}
                </div>
                <Albums likedSongs={likedSongs} setLikedSongs={setLikedSongs} />
            </div>
        </div>
    );
}

function Header() {
    return <h1 className="header-title">Music playlist🎧️</h1>;
}

function Button({ onClick, children }) {
    return (
        <button className="btn" onClick={() => onClick()}>
            {children}
        </button>
    );
}

function Users({ onClick, lickedSongs }) {
    return (
        <ul className="users">
            {initialUsers.map((user) => (
                <User
                    key={user.id}
                    user={user}
                    onClick={onClick}
                    likedSongs={lickedSongs}
                />
            ))}
        </ul>
    );
}

function AddAlbumForm({ onSetAlbumName, albumName }) {
    return (
        <form className="add-album">
            <h1>Add Album</h1>
            <div className="album-info">
                <div className="album-li">
                    <label htmlFor="album-cover">Cover URL</label>
                    <input id="album-cover" type="text" />
                </div>
                <div className="album-li">
                    <label htmlFor="album-name">Album name</label>
                    <input
                        type="text"
                        value={albumName}
                        onChange={onSetAlbumName}
                        placeholder="please write album name"
                        id="album-name"
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="album-artist">Album artist</label>
                    <input
                        type="text"
                        placeholder="please write album artist"
                        id="album-artist"
                    />
                </div>
            </div>
            <h3>Songs</h3>
            <div className="songs">
                <div className="album-li">
                    <label htmlFor="song1">1.</label>
                    <input id="song1" type="text" />
                </div>
                <div className="album-li">
                    <label htmlFor="song2">2.</label>
                    <input id="song2" type="text" />
                </div>
                <div className="album-li">
                    <label htmlFor="song3">3.</label>
                    <input id="song3" type="text" />
                </div>
                <div className="album-li">
                    <label htmlFor="song4">4.</label>
                    <input id="song4" type="text" />
                </div>
                <div className="album-li">
                    <label htmlFor="song5">5.</label>
                    <input id="song5" type="text" />
                </div>
                <div className="album-li">
                    <label htmlFor="song6">6.</label>
                    <input id="song6" type="text" />
                </div>
            </div>

            <Button>Add Album</Button>
        </form>
    );
}

function User({ user, onClick, likedSongs }) {
    // this is used to flat the songs on one array from the big array!
    const totalSongs = likedSongs.flatMap((album) => album.songs);
    const AllLikedSongs = totalSongs.filter((song) => song.liked);
    const numberOfLikes = AllLikedSongs.length;

    return (
        <li className="user">
            <h3>🎶 {user.name}</h3>
            <p>Liked songs: {numberOfLikes > 0 ? numberOfLikes : 0}</p>
            <Button onClick={onClick}>Add New Album</Button>
        </li>
    );
}

function Albums({ likedSongs, setLikedSongs }) {
    return (
        <ul className="albums">
            {initialAlbums.map((album) => (
                <Album
                    key={album.name}
                    album={album}
                    likedSongs={likedSongs}
                    setLikedSongs={setLikedSongs}
                />
            ))}
        </ul>
    );
}

function Album({ album, likedSongs, setLikedSongs }) {
    return (
        <li className="album">
            <img src={album.img} alt={`${album.name} cover`} />
            <h3>{album.name}</h3>
            <h4>by</h4>
            <h2>{album.artist}</h2>
            {album.songs.map((song) => (
                <Song
                    key={song.name}
                    song={song}
                    id={album.name}
                    likedSongs={likedSongs}
                    setLikedSongs={setLikedSongs}
                />
            ))}
        </li>
    );
}

function Song({ song, id, likedSongs, setLikedSongs }) {
    const [isLiked, setIsLiked] = useState(song.liked);

    function likeSong(albumName, songName) {
        setIsLiked(!isLiked);
        const newLiked = likedSongs.map((album) =>
            album.name === albumName
                ? {
                      ...album,
                      songs: album.songs.map((song) =>
                          song.name === songName
                              ? { ...song, liked: !isLiked }
                              : song
                      ),
                  }
                : album
        );
        console.log(newLiked);
        // elevated the setter to not re-render the element!
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
