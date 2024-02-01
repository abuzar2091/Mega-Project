import React, { useState, useEffect } from "react";
import service from "../../appwrite/Config";
import { Container, PostCard } from "../../components";
import authService from "../../appwrite/Auth";
import { useSelector } from "react-redux";

function Home() {
  ///new secton
  let authStatus = useSelector((state) => state.auth.status);
  let [email, setEmail] = useState("");
  const [posts, setPost] = useState([]);
  // const [userid,setUserId]=useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await authService.getCurrentUSer();
        setEmail(user.email);
        // setUserId(user.$id);
        service.getPosts(user.$id).then((posts) => {
          if (posts) {
            // console.log(posts);
            setPost(posts.documents);
          }
        });
        // console.log("re render",Math.random());
        // console.log(user.$id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, [email, setEmail, authStatus]);
  useEffect(() => {
    setPost([]);
  }, [!authStatus]);

  if (posts.length === 0 && authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="textt-2xl font-bold hover:text-gray-500">
                You did not Post Anything
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (posts.length === 0 && !authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="textt-2xl font-bold hover:text-gray-500">
                Login To Read Post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="  flex flex-col">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4 mx-auto md:w-1/2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
