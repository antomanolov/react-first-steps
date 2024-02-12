import { useEffect, useState } from "react";

const initialUsers = [
    { name: "Anton", albums: [], avatar: "", likedSongs: 0, id: 0 },
];

export default function App() {
    const [showAlbums, setShowAlbums] = useState(false);
    const [likedSongs, setLikedSongs] = useState(function () {
        const storedValue = localStorage.getItem("albums");
        return storedValue ? JSON.parse(storedValue) : [];
    });

    useEffect(
        function () {
            localStorage.setItem("albums", JSON.stringify(likedSongs));
        },
        [likedSongs]
    );

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
                            setAlbums={setLikedSongs}
                            albums={likedSongs}
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

function AddAlbumForm({ albums, setAlbums }) {
    const [albumName, setAlbumName] = useState("");
    const [albumCover, setAlbumCover] = useState("");
    const [albumArtist, setAlbumArtist] = useState("");
    const [year, setYear] = useState("");
    const [song1, setSong1] = useState({ name: "", liked: false });
    const [song2, setSong2] = useState({ name: "", liked: false });
    const [song3, setSong3] = useState({ name: "", liked: false });
    const [song4, setSong4] = useState({ name: "", liked: false });
    const [song5, setSong5] = useState({ name: "", liked: false });
    const [song6, setSong6] = useState({ name: "", liked: false });

    function onFormSubmit(e) {
        e.preventDefault();
        const newAlbum = {
            name: albumName,
            artist: albumArtist,
            songs: [song1, song2, song3, song4, song5, song6],
            year: year,
            img: albumCover,
        };
        if (
            albumArtist &&
            albumCover &&
            albumName &&
            year &&
            song1 &&
            song2 &&
            song3 &&
            song4 &&
            song5 &&
            song6
        )
            setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
    }

    return (
        <form className="add-album" onSubmit={onFormSubmit}>
            <h1>Add Album</h1>
            <div className="album-info">
                <div className="album-li">
                    <label htmlFor="album-cover">Cover URL</label>
                    <input
                        id="album-cover"
                        type="text"
                        value={albumCover}
                        onChange={(e) => setAlbumCover(e.target.value)}
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="album-name">Album name</label>
                    <input
                        type="text"
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
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
                        value={albumArtist}
                        onChange={(e) => setAlbumArtist(e.target.value)}
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="albumYear">Year</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
            </div>
            <h3>Songs</h3>
            <div className="songs">
                <div className="album-li">
                    <label htmlFor="song1">1.</label>
                    <input
                        id="song1"
                        type="text"
                        value={song1.name}
                        onChange={(e) =>
                            setSong1((prevObj) => ({
                                ...prevObj,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="song2">2.</label>
                    <input
                        id="song2"
                        type="text"
                        value={song2.name}
                        onChange={(e) =>
                            setSong2((prevObj) => ({
                                ...prevObj,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="song3">3.</label>
                    <input
                        id="song3"
                        type="text"
                        value={song3.name}
                        onChange={(e) =>
                            setSong3((prevObj) => ({
                                ...prevObj,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="song4">4.</label>
                    <input
                        id="song4"
                        type="text"
                        value={song4.name}
                        onChange={(e) =>
                            setSong4((prevObj) => ({
                                ...prevObj,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="song5">5.</label>
                    <input
                        id="song5"
                        type="text"
                        value={song5.name}
                        onChange={(e) =>
                            setSong5((prevObj) => ({
                                ...prevObj,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="album-li">
                    <label htmlFor="song6">6.</label>
                    <input
                        id="song6"
                        type="text"
                        value={song6.name}
                        onChange={(e) =>
                            setSong6((prevObj) => ({
                                ...prevObj,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>

            <button>Add Album</button>
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
            {likedSongs.map((album) => (
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
