import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../../components";
import service from "../../appwrite/Config";

function AllPosts() {
  const [posts, setPost] = useState([]);
  useEffect(() => {}, []);
  service.getAllPosts([]).then((posts) => {
    if (posts) {
      setPost(posts.documents);
    }
  });
  return (
    <div className=" w-full py-8">
      <Container>
        <div className="flex flex-col">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4 mx-auto md:w-1/2">
              {/* <PostCard  post={post}/> */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
