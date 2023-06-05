import { useState, useEffect } from "react";
import axios from "axios";

export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [minCharacters, setMinCharacters] = useState('');
    const [maxCharacters, setMaxCharacters] = useState('');
    const [isDataVisible, setIsDataVisible] = useState(true);
  
    useEffect(() => {
      axios
        .get('https://jsonplaceholder.typicode.com/comments')
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    const handleMinCharactersChange = event => {
      setMinCharacters(event.target.value);
    };
  
    const handleMaxCharactersChange = event => {
      setMaxCharacters(event.target.value);
    };
  
    const toggleDataVisibility = () => {
      setIsDataVisible(!isDataVisible);
    };
  
    return (
      <div>
        <h2>Comment List</h2>
        <button onClick={toggleDataVisibility}>
          {isDataVisible ? 'Hide Data' : 'Show Data'}
        </button>
        {isDataVisible && (
          <div>
            <label>
              Min Characters:
              <input
                type="text"
                value={minCharacters}
                onChange={handleMinCharactersChange}
              />
            </label>
            <br />
            <label>
              Max Characters:
              <input
                type="text"
                value={maxCharacters}
                onChange={handleMaxCharactersChange}
              />
            </label>
            <br />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Body</th>
                </tr>
              </thead>
              <tbody>
                {comments
                  .filter(comment => {
                    if (
                      minCharacters &&
                      comment.body.length < parseInt(minCharacters)
                    ) {
                      return false;
                    }
                    if (
                      maxCharacters &&
                      comment.body.length > parseInt(maxCharacters)
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map(comment => (
                    <tr key={comment.id}>
                      <td>{comment.id}</td>
                      <td>{comment.name}</td>
                      <td>{comment.email}</td>
                      <td>{comment.body}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };