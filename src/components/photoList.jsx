import { useState, useEffect } from "react";
import axios from "axios";

export const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(true);
  const [minCharacters, setMinCharacters] = useState("");
  const [maxCharacters, setMaxCharacters] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setPhotos(response.data);
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

  const filteredPhotos = photos.filter((photo) => {
    if (minCharacters && photo.title.length < parseInt(minCharacters)) {
      return false;
    }
    if (maxCharacters && photo.title.length > parseInt(maxCharacters)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h2>Photo List</h2>
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
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {filteredPhotos.map((photo) => (
                <tr key={photo.id}>
                  <td>{photo.id}</td>
                  <td>{photo.title}</td>
                  <td>
                    <img
                      src={photo.url}
                      alt={photo.title}
                      style={{ width: "100px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
