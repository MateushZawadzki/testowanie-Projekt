import { useState, useEffect } from "react";
import axios from "axios";


export const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(true);
  const [minCharacters, setMinCharacters] = useState("");
  const [maxCharacters, setMaxCharacters] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleDataVisibility = () => {
    setIsDataVisible(!isDataVisible);
  };

  const handleMinCharactersChange = (event) => {
    setMinCharacters(event.target.value);
  };

  const handleMaxCharactersChange = (event) => {
    setMaxCharacters(event.target.value);
  };

  const filteredAlbums = albums.filter((album) => {
    if (minCharacters && album.title.length < parseInt(minCharacters)) {
      return false;
    }
    if (maxCharacters && album.title.length > parseInt(maxCharacters)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h2>Album List</h2>
      <button onClick={toggleDataVisibility}>
        {isDataVisible ? "Hide Data" : "Show Data"}
      </button>
      {isDataVisible && (
        <div>
          <div>
            <label>
              Min Characters:
              <input
                type="text"
                value={minCharacters}
                onChange={handleMinCharactersChange}
              />
            </label>
          </div>
          <div>
            <label>
              Max Characters:
              <input
                type="text"
                value={maxCharacters}
                onChange={handleMaxCharactersChange}
              />
            </label>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlbums.map((album) => (
                <tr key={album.id}>
                  <td>{album.id}</td>
                  <td>{album.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
