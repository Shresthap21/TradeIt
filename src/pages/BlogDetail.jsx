import axiosPrivate from "@/axios/axiosPrivate";
import { Layout } from "@/components/Layout";
import { Tag } from "antd";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const getBlogById = async () => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get(`/blogs?blogId=${id}`);
      console.log(res);
      setBlogDetail(res.data.blog);
    } catch (error) {
      console.error("ERR:GET::BLOG-DETAIL");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogById();
  }, []);

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
        <div className="w-full bg-white h-fit">
          <div className="bg-white w-full max-w-[45rem] mx-auto p-6">
            <div className="space-y-2 text-gray-700">
              <h1 className="text-4xl font-bold text-gray-800">
                {blogDetail.title}
              </h1>
              <p className="text-lg text-gray-600">
                {blogDetail.shortDescription}
              </p>
              <p className="flex  items-center gap-x-2">
                By {blogDetail.author}
                <span className="w-[5px] h-[5px] bg-gray-500 rounded-full text-lg"></span>
                <span className="">
                  {format(parseISO(blogDetail?.publishedOn), "MMM dd, yyyy")}
                </span>
              </p>
            </div>
            <hr className="my-4" />
            {blogDetail.tags?.map((tag) => (
              <Tag color="magenta">{tag}</Tag>
            ))}
            <hr className="my-4" />
            <Markdown
              className="prose prose-lg max-w-full"
              remarkPlugins={[remarkGfm]}
            >
              {blogDetail?.content}
            </Markdown>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BlogDetail;
