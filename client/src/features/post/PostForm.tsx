import React, { Fragment, useEffect, Suspense, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../store";
// import { fetchTopicData } from "../../store/topic/topic-action";
import "react-quill/dist/quill.snow.css";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Topic } from "../../interface/ITopic";
import axios from "axios";
import { useGetPostsQuery } from "./postsApiSlice";
import { useGetTopicsQuery } from "../topics/topicsApiSlice";
import { IPost } from "../../interface/iPost";
import { useAddNewPostMutation } from "./postsApiSlice";
// import {
//   setCategoryToStore,
//   setContentToStore,
//   setCoverPhotoToStore,
//   setInputValueToStore,
//   setIsFeatureToStore,
//   setStatusToStore,
//   setTopicToStore,
//   setVisibilityToStore,
// } from "../../store/post/post-slice";
// import { addPost } from "../../store/post/post-action";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const loadQuillNoSSRWrapper = () =>
  import("react-quill").then((module) => ({ default: module.default }));

const DynamicQuillNoSSRWrapper = React.lazy(loadQuillNoSSRWrapper);
const categories = ["Blog", "TIL"];

const visibilityOptions = ["Private", "Public"];
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const PostForm = () => {
  const { data: posts } = useGetPostsQuery();
  const { data: allTopics, isLoading: isTopicsLoading } = useGetTopicsQuery();
  const [addNewPost] = useAddNewPostMutation();
  const [post, setPost] = useState<IPost>({
    category: "",
    topic: [],
    title: "",
    summary: "",
    coverPhoto: "",
    isFeatured: false,
    content: "",
    status: "Draft",
    visibility: "Public",
    relatedArticles: [],
  });

  // const dispatch = useAppDispatch();
  // const allTopic = useAppSelector((state) => state.topic.topic);
  // const postItem = useAppSelector((state) => state.post.postItem);
  // const tempTopic = useAppSelector((state) => state.post.postItem.topic);
  // const tempCateg = useAppSelector((state) => state.post.postItem.category);
  // const tempCoverPhoto = useAppSelector(
  //   (state) => state.post.postItem.coverPhoto
  // );
  // const tempTitle = useAppSelector((state) => state.post.postItem.title);
  // const tempSummary = useAppSelector((state) => state.post.postItem.summary);
  // const tempIsFeatured = useAppSelector(
  //   (state) => state.post.postItem.isFeatured
  // );
  // const tempContent = useAppSelector((state) => state.post.postItem.content);
  // const tempVisibility = useAppSelector(
  //   (state) => state.post.postItem.visibility
  // );
  // const tempStatus = useAppSelector((state) => state.post.postItem.status);
  // console.log(postItem);

  // useEffect(() => {
  //   dispatch(fetchTopicData());
  // }, [dispatch]);
  console.log(posts);
  console.log(post);
  console.log(allTopics);

  const handleChangeCategory = (
    _: React.SyntheticEvent,
    value: string | null
  ) => {
    console.log(value);
    if (value) setPost((prev) => ({ ...prev, category: value }));
    // dispatch(setCategoryToStore(value));
  };
  const handleChangeTopic = (
    _: React.SyntheticEvent,
    value: Topic[] | null
  ) => {
    const selectedTopics = value
      ? value.map((topic) => ({ _id: topic._id, name: topic.name }))
      : [];
    setPost((prev) => ({ ...prev, topic: selectedTopics }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickIsFeatured = () => {
    setPost((prev) => ({ ...prev, isFeatured: !prev.isFeatured }));
  };
  const handleChangeContent = (value: string) => {
    setPost((prev) => ({ ...prev, content: value }));
  };

  const handleClickSaveAsDraft = () => {
    setPost((prev) => ({ ...prev, status: "Draft" }));
  };

  const handleChangeVisibility = (
    _: React.SyntheticEvent,
    value: string | null
  ) => {
    setPost((prev) => ({ ...prev, visibility: value || "" }));
    // dispatch(setVisibilityToStore(value));
  };

  const handlerChangeCoverPhoto = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let imageSrc = "";
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(fileInput.files[0]);

      const formData = new FormData();
      for (const file of fileInput.files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "ml_default");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
          formData
        );
        const imageData = response.data;

        console.log("Image data:", imageData.secure_url);
        if (imageData.secure_url) {
          imageSrc = imageData.secure_url;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // dispatch(setCoverPhotoToStore(imageSrc));
    setPost((prev) => ({ ...prev, coverPhoto: imageSrc }));
  };

  // function async uploadImageToCloudinary<T>(formData: T): void {
  //   try {
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
  //       formData
  //     );
  //     const imageData = response.data;
  //     return imageData;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     throw error;
  //   }
  // };

  const handleClickSavePost = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (e.type === "submit") {
        if (post.title && post.category && post.topic && post.content) {
          setPost((prev) => ({ ...prev, status: "Publish" }));
          await addNewPost(post).unwrap();
        } else {
          await addNewPost(post).unwrap();
        }
      }
    } catch (error) {
      console.error(`💥💥 ${error}`);
    }
    // console.log(e.target);

    // const form = e.target as HTMLFormElement;

    // const fileInput = form.querySelector<HTMLInputElement>("#coverPhoto");
    // console.log(fileInput);
    // dispatch(addPost(postItem));
    // if (fileInput && fileInput.files) {
    //   const formData = new FormData();
    //   for (const file of fileInput.files) {
    //     formData.append("file", file);
    //   }

    //   formData.append("upload_preset", "ml_default");
    //   console.log(typeof formData);

    //   try {
    //     const response = await axios.post(
    //       "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
    //       formData
    //     );
    //     const imageData = response.data;

    //     console.log("Image data:", imageData.secure_url);
    //     // if (imageData.secure_url) {
    //     //   dispatch(setCoverPhotoToStore(imageData.imageData.secure_url));
    //     // }
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //   }
    // }
  };

  // const handleClickSavePost = (e: HTMLFormEvent) => {
  //   e.preventDefault();
  //   console.log(e.target);

  //   const form = e.target;

  //   const fileInput = Array.from(form.elements).find(
  //     ({ id }) => id === "coverPhoto"
  //   );
  //   // // if (fileInput) {
  //   //   console.log(fileInput as Element);
  //   // }

  //   const formData = new FormData();

  //   if (fileInput) {
  //     for (const file of fileInput.files) {
  //       formData.append("file", file);
  //     }
  //   }
  // dispatch(addPost(postItem));
  // };
  // console.log(post);

  return (
    <Fragment>
      <div className="pt-20 ">
        <h2 className="mx-4 font-semibold text-blue text-[20px] mb-4">
          Create blog post
        </h2>
        <form onSubmit={handleClickSavePost} className="flex flex-col gap-8">
          <div className="bg-white">
            <div className="flex flex-col gap-4 px-4 pt-8">
              {/* CATEGORY */}
              <div>
                <label
                  htmlFor="categories"
                  className="text-[rgb(116,117,119)] text-sm"
                >
                  Category:
                </label>
                <Autocomplete
                  value={post.category}
                  onChange={handleChangeCategory}
                  disablePortal
                  size="small"
                  id="category"
                  options={categories}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{
                    marginTop: "4px",
                    outlineOffset: "3px solid rgb(14 165 233)",
                    "&:focus-within": {
                      outline: "3px solid rgb(14 165 233)",
                      borderRadius: "4px",
                    },
                  }}
                />
              </div>

              {/* TOPIC */}
              {!isTopicsLoading && allTopics && (
                <div>
                  <label htmlFor="topics" className="text-[#747577] text-sm">
                    Topic:
                  </label>

                  <Autocomplete
                    size="small"
                    multiple
                    id="topics"
                    options={allTopics}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => {
                      const isSelectedTopic = post.topic.some((topic) => {
                        return option._id === topic?._id;
                      });

                      const handleClickOption = () => {
                        const newSelectedTopics = isSelectedTopic
                          ? post.topic
                              .filter((topic) => topic._id !== option._id)
                              .map((topic) => {
                                return { _id: topic._id, name: topic.name };
                              })
                          : [
                              ...post.topic,
                              { _id: option._id, name: option.name },
                            ];

                        setPost((prev) => ({
                          ...prev,
                          topic: newSelectedTopics,
                        }));
                      };

                      return (
                        <li {...props} onClick={handleClickOption}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={isSelectedTopic}
                          />
                          {option.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <Fragment>
                              {post.topic.map((topic) => (
                                <Chip
                                  key={topic._id}
                                  label={topic.name}
                                  size="small"
                                  onDelete={() => {
                                    const newSelectedTopics = post.topic.filter(
                                      (t) => t._id !== topic._id
                                    );

                                    setPost((prev) => ({
                                      ...prev,
                                      topic: newSelectedTopics,
                                    }));
                                  }}
                                  className="MuiAutocomplete-tag MuiAutocomplete-tagSizeSmall"
                                />
                              ))}
                              {params.InputProps.startAdornment}
                            </Fragment>
                          ),
                        }}
                      />
                    )}
                    sx={{
                      marginTop: "4px",
                      outlineOffset: "3px solid rgb(14 165 233)",
                      "&:focus-within": {
                        outline: "3px solid rgb(14 165 233)",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </div>
              )}

              {/* TITLE */}
              <div>
                <label htmlFor="title" className="text-[#747577] text-sm">
                  Title:
                </label>
                <input
                  onChange={handleChangeInput}
                  id="title"
                  name="title"
                  value={post.title}
                  className="hover:border-[#000] focus:border-blue mt-1"
                />
              </div>

              {/* SUMMARY */}
              <div>
                <label htmlFor="summary" className="text-[#747577] text-sm ">
                  Summary:
                </label>
                <input
                  onChange={handleChangeInput}
                  name="summary"
                  id="summary"
                  value={post.summary}
                  className="hover:border-[#000] focus:border-blue mt-1"
                />
              </div>

              {/* COVER PHOTO */}
              <div>
                <label
                  htmlFor="cover-photo"
                  className="font-[300] text-[#747577] text-sm"
                >
                  Cover photo:
                </label>
                <div className="flex gap-2">
                  <label
                    htmlFor="coverPhoto"
                    className="border w-full text-center"
                  >
                    <p>Choose file</p>
                  </label>
                  <input
                    onChange={handlerChangeCoverPhoto}
                    id="coverPhoto"
                    name="coverPhoto"
                    type="file"
                    className="hidden"
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {post.coverPhoto ? post.coverPhoto : "No file chosen"}
                  </span>
                </div>

                {post.coverPhoto && typeof post.coverPhoto === "string" ? (
                  <div className="mt-2 max-w-md mx-auto h-48 overflow-hidden rounded-sm shadow-lg grid place-items-center">
                    <img
                      src={post.coverPhoto}
                      className="w-full"
                      alt="Cover photo"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* IS FEATURED BLOG */}
              <div className="mt-2">
                <Checkbox
                  checked={post.isFeatured}
                  onClick={handleClickIsFeatured}
                  id="isFeatured"
                  className="p-0 m-0 "
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 text-[16px] text-gray font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                >
                  Is featured blog post?
                </label>
              </div>

              {/* EDITOR */}
              <Suspense fallback={<div>Loading Quill editor</div>}>
                <DynamicQuillNoSSRWrapper
                  id="content"
                  className="mt-4 overflow-hidden bg-white rounded-sm"
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={post.content}
                  onChange={handleChangeContent}
                />
              </Suspense>
            </div>
          </div>

          {/* PUBLISH */}
          <div className="bg-white">
            <div className="mx-4 mb-8 ">
              <h3 className="mb-3 text-lg font-inter text-grayDark/90">
                Publish
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={handleClickSavePost}
                    className="bg-[#f3f3f3] text-gray/90 border border-gray/40 hover:bg-[#F7F7F7]/10"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    className="bg-[#f3f3f3] text-gray/90 border border-gray/30 hover:bg-[#F7F7F7]/10"
                  >
                    Preview
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#747577] text-sm">Status:</p>
                  <p>
                    {post.status &&
                      post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="visibility"
                    className="text-[rgb(116,117,119)] text-sm"
                  >
                    Visibility:
                  </label>
                  <Autocomplete
                    onChange={handleChangeVisibility}
                    disablePortal
                    id="visibility"
                    options={visibilityOptions}
                    size="small"
                    value={post.visibility}
                    sx={{
                      marginTop: "4px",
                      outlineOffset: "3px solid rgb(14 165 233)",
                      "&:focus-within": {
                        outline: "3px solid rgb(14 165 233)",
                        borderRadius: "4px",
                      },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="button" className="w-2/4">
                    Delete
                  </button>
                  <button className="w-2/4" type="submit">
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default PostForm;
