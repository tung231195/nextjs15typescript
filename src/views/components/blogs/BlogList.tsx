"use client";
import * as React from "react";
import BlogItem from "./BlogItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchPosts } from "@/app/store/actions/post";

export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    console.log("dispatch 123");
    dispatch(fetchPosts());
  }, [dispatch]);

  return <BlogItem />;
}
