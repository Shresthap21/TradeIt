import { Tag } from "antd";
import { format, parseISO } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const BlogsItem = ({ data }) => {
  const { id, title, shortDescription, author, imageUrl, publishedOn, tags } =
    data;
  return (
    <Link
    onClick={(e)=>e.stopPropagation()}
      to={`/blogs/${id}`}
      className="cursor-pointer flex gap-x-3 text-gray-800  justify-between px-4 py-10"
    >
      <div className="space-y-2">
        <span className="text-xs">by {author}</span>
        <div className="space-y-1">
          <div className="flex items-center gap-x-4">
            <h1 className="text-xl font-bold">{title}</h1>
            <div>
              {tags?.map((tag) => (
                <Link to={`/blogs/tag/${tag}`}>
                  <Tag className="cursor-pointer" color="magenta">
                    {tag}
                  </Tag>
                </Link>
              ))}
            </div>
          </div>
          <p className="text-sm">{shortDescription}</p>
        </div>
        <span className="text-xs flex items-center gap-x-1">
          <span className="text-yellow-500 text-lg">✦</span>
          {format(parseISO(publishedOn), "MMM dd, yyyy")}
        </span>
      </div>

      <img className="w-60" src={imageUrl} alt="" />
    </Link>
  );
};

export default BlogsItem;
