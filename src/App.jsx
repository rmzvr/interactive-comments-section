import "./styles/sass/components/App.scss";
import data from "./data.json";
import Comment from "./components/Comment";

function App() {
  const comments = data.comments;
  
  return (
    <div className="App">
      <div className="container">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment}></Comment>
        ))}
      </div>
    </div>
  );
}

export default App;
