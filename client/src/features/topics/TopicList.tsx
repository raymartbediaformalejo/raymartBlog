import { ChangeEvent, Fragment, useState, useEffect } from "react";
import MyModal from "../../components/MyModal";
import {
  useGetTopicsQuery,
  useAddNewTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} from "./topicsApiSlice";
// import { useAppDispatch, useAppSelector } from "../../../store";
// import {
//   addNewTopic,
//   deleteTopic,
//   editTopic,
//   fetchTopicData,
// } from "../../../store/topic/topic-action";

const TopicList = () => {
  const {
    data: topics,
    isLoading: isTopicsLoading,
    isError,
    error,
  } = useGetTopicsQuery();
  const [addNewTopic, { isLoading: isAddNewLoading }] =
    useAddNewTopicMutation();
  const [updateTopic, { isLoading: isEditLoading }] = useUpdateTopicMutation();
  const [deleteTopic, { isLoading: isDeleteLoading }] =
    useDeleteTopicMutation();
  // const dispatch = useAppDispatch();
  // const allTopic = useAppSelector((state) => state.topic.topic);
  const [newTopic, setNewTopic] = useState("");
  const [oldEditTopicName, setOldEditTopicName] = useState<string>("");
  const [toEditTopicName, setToEditTopicName] = useState<string>("");
  const [toEditTopicId, setToEditTopicID] = useState<string>();
  const [toDeleteTopicName, setToDeleteTopicName] = useState<string>("");
  const [toDeleteTopicId, setToDeleteTopicID] = useState<string>();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  console.log(newTopic);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEdit = (oldNameValue: string, id?: string) => {
    setOpenEdit(true);
    setOldEditTopicName(oldNameValue);
    setToEditTopicID(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenDelete = (oldNameValue: string, id?: string) => {
    setOpenDelete(true);
    setToDeleteTopicName(oldNameValue);
    setToDeleteTopicID(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickSaveTopic = async () => {
    try {
      if (newTopic) {
        await addNewTopic({ name: newTopic }).unwrap();
        setOpen(false);
        setNewTopic("");
      } else if (toDeleteTopicId) {
        await deleteTopic({ _id: toDeleteTopicId, name: "" }).unwrap();
        setOpenDelete(false);
        setToDeleteTopicID("");
      } else if (toEditTopicId && oldEditTopicName && toEditTopicName) {
        await updateTopic({
          _id: toEditTopicId,
          name: toEditTopicName,
        }).unwrap();
        setOpenEdit(false);
        setToEditTopicID("");
        setOldEditTopicName("");
        setToEditTopicName("");
      }
    } catch (error) {
      console.error(`💥💥 ${error}`);
    }
  };

  const topicNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTopic(e.target.value);
  };
  const handlerChangeEditTopicName = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setToEditTopicName(e.target.value);
  };

  return (
    <Fragment>
      {openEdit && oldEditTopicName && (
        <MyModal
          type="edit"
          openModal={openEdit}
          handleCloseModal={handleCloseEdit}
          modalHeader={`Edit topic ${oldEditTopicName}`}
          placeHolderTopic={toEditTopicName}
          handleChangeTopicName={handlerChangeEditTopicName}
          handleClickSave={handleClickSaveTopic}
        />
      )}

      {openDelete && toDeleteTopicName && (
        <MyModal
          type="delete"
          openModal={openDelete}
          handleCloseModal={handleCloseDelete}
          modalHeader={`Are you sure you want to delete topic ${toDeleteTopicName}?`}
          handleClickSave={handleClickSaveTopic}
        />
      )}
      {isTopicsLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col mx-4 mt-24">
          <button onClick={handleOpen} className="self-end mr-4">
            New topic
          </button>
          <MyModal
            type="add"
            openModal={open}
            handleCloseModal={handleClose}
            modalHeader="Add new topic"
            handleChangeTopicName={topicNameChangeHandler}
            handleClickSave={handleClickSaveTopic}
          />

          <table className="table-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics &&
                topics.map(({ name, _id }) => {
                  return (
                    <tr key={_id}>
                      <td>{name}</td>
                      <td>
                        <button
                          onClick={() => handleOpenEdit(name, _id)}
                          className="bg-green"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleOpenDelete(name, _id)}
                          className="text-white bg-red/80"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};
export default TopicList;
