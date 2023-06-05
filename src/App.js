import { PostList } from './components/postList.jsx';
import { CommentList } from './components/commentList.jsx'
import { AlbumList } from './components/albumList.jsx';
import { PhotoList } from './components/photoList.jsx';
import "./App.css";




function App() {
  return (
    <div>
      <h1>jsonplaceholder app for classes</h1> 
      <PostList />
      <CommentList />
    
      <AlbumList />
      <PhotoList />
      Created by: Mateusz Zawadzki
    </div>
  );
}

export default App;
