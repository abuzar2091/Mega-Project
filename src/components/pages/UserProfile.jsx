import React, { useState, useEffect } from "react";
import { Button, Container, PostCard } from "../../components";
import service from "../../appwrite/Config";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../appwrite/Auth";

function UserProfile() {
  const { userid } = useParams();
  let authStatus = useSelector((state) => state.auth.status);
  const [posts, setPost] = useState([]);
  const [postcount,setPostCount]=useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await authService.getCurrentUSer();

        await service.getPosts(user.$id).then((posts) => {
          if (posts) {
            // console.log(posts);
            setPost(posts.documents);
            setPostCount(posts.documents.length);
          }
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

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
  }

  return (
    <div className="w-full py-8">
        <div>
        User : {userid}
        <div className="mt-4">
      Post: {postcount}
   
    <button className=" bg-blue-600 text-white px-4 py-2  mx-8  rounded-lg" >
    followers
    </button>
    <button className=" bg-blue-600 text-white px-4 py-2 mx-0 rounded-lg" >
    following
    </button>
    </div>
    <button className=" bg-blue-600 text-white px-4 py-2 mx-0 mt-6 rounded-lg" >
    follow
    </button>
 </div>
      

    
      <Container>
        <div className="  flex mt-10 flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="mb-8 p-2 w-1/4 mx-8 md:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default UserProfile;
