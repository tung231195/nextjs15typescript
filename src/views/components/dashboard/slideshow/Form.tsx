"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addSlideshow, updateSlideshow } from "@/app/store/actions/slideshow";
import { useCallback, useEffect, useState } from "react";
import { getSlideshowService } from "@/app/services/slideshowService";
import { SlideshowCreate, SlideshowType } from "@/app/types";
import CustomRichEditor from "@/app/components/custom/CustomRichEditor";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomFileUploadField from "@/app/components/custom/CustomFileUploadField";
type TPropSlideshowForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};
const SlideshowForm = (props: TPropSlideshowForm) => {
  const router = useRouter();
  const { handleClose, openModal } = props;
  const [slideshow, setSlideshow] = useState<SlideshowType>();
  const dispatch = useDispatch<AppDispatch>();

  const schema = yup.object().shape({
    title: yup.string().required("The Title is required"),
    description: yup.string().required("The Content is required"),
    image: yup.array(yup.string().defined()).required("The images are required"),
    status: yup.mixed<"enable" | "disabled">().oneOf(["enable", "disabled"]).required(),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SlideshowCreate>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image: [],
      status: "enable",
    },
  });

  const fetchSlideshowByIdCallBack = useCallback(async () => {
    if (openModal.id) {
      const res = await getSlideshowService(openModal.id);
      setSlideshow(res);
    }
  }, [openModal.id]);
  /** use effect */
  useEffect(() => {
    if (openModal.id) {
      fetchSlideshowByIdCallBack();
    }
  }, [openModal.id, fetchSlideshowByIdCallBack]);

  useEffect(() => {
    if (openModal.id) {
      reset({
        title: slideshow?.title,
        description: slideshow?.description,
        image: slideshow?.image,
        status: slideshow?.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        image: [],
        status: "enable",
      });
    }
  }, [slideshow, reset, openModal.id]);

  /** context  */
  const { user } = useAuthContext();
  const stripHtml = (html: string) => {
    return html.replace(/<\/?p>/g, "").trim();
  };
  const onSubmit = async (data: SlideshowCreate) => {
    data.description = stripHtml(data.description);
    if (!user) {
      router.push("/login");
      return;
    }
    if (openModal.id) {
      dispatch(updateSlideshow({ ...data, _id: openModal.id }));
      toast.success("Update Succesfully");
    } else {
      dispatch(addSlideshow({ ...data }));
      toast.success("Add New  Succesfully");
    }
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomTextField<SlideshowCreate>
        name="title"
        label="Title"
        variant="outlined"
        error={!!errors.title}
        fullWidth
        control={control}
      />
      <CustomFileUploadField<SlideshowCreate>
        name="image"
        label="Image"
        control={control}
        multiple
      />

      <CustomRichEditor<SlideshowCreate>
        name="description"
        control={control}
        label="Nội dung"
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      {openModal && openModal.id ? (
        <Button type="submit">Update </Button>
      ) : (
        <Button type="submit">Add New</Button>
      )}
    </form>
  );
};

export default SlideshowForm;
