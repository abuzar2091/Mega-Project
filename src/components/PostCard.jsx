import React from "react";
import service from "../appwrite/Config";
import { Link } from "react-router-dom";

function PostCard({$id, title,featuredImage,followers}){
    return(
        <Link to={`/post/${$id}`}>
         
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={service.getFilePreview(featuredImage)} alt={title}
                    className="rounded-xl h-80 mx-auto"/>

                </div>
                <h2 className="text-xl font-bold">{title}</h2>

            </div>
           
        </Link>
    )
}
export default PostCard;