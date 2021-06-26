import {
  useQuery,
  useMutation,
} from "react-query";


function App() {

  const createPost = async (variables) => {
    // console.log(variables);
    const data = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    
    console.log(data);
  }

  const mutation = useMutation(createPost);
  
  const createSomething = (e) => {
    mutation.mutate({
      title: "foo",
      body: "bar",
      userId: 1,
    });
  }

  return (
    <>
      {mutation.error && (
        <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
      )}
      <h1>Hello world</h1>

      <button onClick={createSomething}>
        {mutation.isLoading
          ? "creating resource..."
          : mutation.isSuccess
          ? "created"
            : "Create a new item"
        }
      </button>
    </>
  );
}

export default App;
