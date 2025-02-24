import axiosPrivate from "@/axios/axiosPrivate";
import BlogsItem from "@/components/BlogsItem";
import { Layout } from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const { tag } = useParams();
  const [loading, setLoading] = useState(true);
  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get("/blogs");
      setAllBlogs(res.data.blogs);
    } catch (error) {
      console.error("ERR::GET::BLOGS", error);
    } finally {
      setLoading(false);
    }
  };
  const getAllBlogsByTag = async () => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get(`/blogs?tagId=${tag}`);
      setAllBlogs(res.data.blogs);
    } catch (error) {
      console.error("ERR::GET::BLOGS-BY-TAG", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tag) {
      getAllBlogsByTag();
    }{
      getAllBlogs();
    }
  }, [tag]);


  return (
    <Layout>
      {loading ? (
        <div className="flex-1  flex justify-center items-center">
          <Oval
            visible={true}
            height="35"
            width="35"
            color="#94a3b8"
            strokeWidth={4}
            secondaryColor="#"
          />
        </div>
      ) : (
        <div className="w-full bg-white p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-5">Blog Posts</h1>
          <div className="divide-y bg-white w-full max-w-[60rem] mx-auto">
            {allBlogs?.map((blog) => (
              <BlogsItem key={blog.id} data={blog} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Blogs;
