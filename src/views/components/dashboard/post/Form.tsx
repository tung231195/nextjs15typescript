"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addPost, updatePost } from "@/app/store/actions/post";
import { useCallback, useEffect, useState } from "react";
import { getPostService } from "@/app/services/postService";
import { PostType } from "@/app/types";
import CustomRichEditor from "@/app/components/custom/CustomRichEditor";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomFileUploadField from "@/app/components/custom/CustomFileUploadField";
type TPropPostForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};
const PostForm = (props: TPropPostForm) => {
  const router = useRouter();
  const { handleClose, openModal } = props;
  const [post, setPost] = useState<PostType>();
  const dispatch = useDispatch<AppDispatch>();
  type FormData = {
    title: string;
    content: string;
    images: string[];
  };
  const schema = yup.object().shape({
    title: yup.string().required("The Title is required"),
    content: yup.string().required("The Content is required"),
    images: yup.array(yup.string().defined()).required("The images are required"),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const fetchPostByIdCallBack = useCallback(async () => {
    if (openModal.id) {
      const res = await getPostService(openModal.id);
      setPost(res);
    }
  }, [openModal.id]);
  /** use effect */
  useEffect(() => {
    if (openModal.id) {
      fetchPostByIdCallBack();
    }
  }, [openModal.id, fetchPostByIdCallBack]);

  useEffect(() => {
    if (openModal.id) {
      reset({
        title: post?.title,
        content: post?.content,
        images: post?.images ?? [],
      });
    } else {
      reset({
        title: "",
        content: "",
        images: [],
      });
    }
  }, [post, reset, openModal.id]);

  /** context  */
  const { user } = useAuthContext();
  const stripHtml = (html: string) => {
    return html.replace(/<\/?p>/g, "").trim();
  };
  const onSubmit = async (data: FormData) => {
    data.content = stripHtml(data.content);
    if (!user) {
      router.push("/login");
      return;
    }
    if (openModal.id) {
      dispatch(
        updatePost({ ...data, user: user?._id, _id: openModal.id, likes: [], likesCount: 0 }),
      );
      toast.success("Update Succesfully");
    } else {
      dispatch(addPost({ ...data, user: user?._id }));
      toast.success("Add New  Succesfully");
    }
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomTextField<FormData>
        name="title"
        label="Title"
        variant="outlined"
        error={!!errors.title}
        fullWidth
        control={control}
      />

      <CustomRichEditor<FormData>
        name="content"
        control={control}
        label="Nội dung"
        error={!!errors.content}
        helperText={errors.content?.message}
      />
      <CustomFileUploadField<FormData>
        name="images"
        control={control}
        label="Upload Product Images"
        multiple
      />
      {openModal && openModal.id ? (
        <Button type="submit">Update </Button>
      ) : (
        <Button type="submit">Add New</Button>
      )}
    </form>
  );
};

export default PostForm;
