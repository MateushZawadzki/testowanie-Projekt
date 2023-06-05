import { useState, useEffect } from "react";
import axios from "axios";

export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [minCharacters, setMinCharacters] = useState('');
    const [maxCharacters, setMaxCharacters] = useState('');
    const [isDataVisible, setIsDataVisible] = useState(true);
  
    useEffect(() => {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          setPosts(response.data);
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
        <h2>Post List</h2>
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
                  <th>Title</th>
                  <th>Body</th>
                </tr>
              </thead>
              <tbody>
                {posts
                  .filter(post => {
                    if (
                      minCharacters &&
                      post.body.length < parseInt(minCharacters)
                    ) {
                      return false;
                    }
                    if (
                      maxCharacters &&
                      post.body.length > parseInt(maxCharacters)
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map(post => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };