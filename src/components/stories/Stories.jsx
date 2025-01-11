import "./stories.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStory, getStories, getUserStories } from "../../api/stories";
import { AuthContext } from "../../context/authContext";
import { useContext, useState, useRef } from "react";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import { Link } from "react-router-dom";
import StoryModal from "./StoryModal";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedStories, setSelectedStories] = useState([])

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  const { data: userStories } = useQuery({
    queryKey: ["userStories"],
    queryFn: async () => await getUserStories(currentUser.username),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["userStories"]);
    }
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleClearModal = () => {
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file)
      setSelectedImage(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("File", selectedImage);
    }
    mutation.mutate(formData);
    handleCloseModal();
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleOpenStoryModal = (stories) => {
    setSelectedStories(stories);
    setIsStoryModalOpen(true);
  };

  const handleCloseStoryModal = () => {
    setSelectedStories([])
    setIsStoryModalOpen(false);
  };

  return (
    <div className="stories">
      <div className="story create-story">
        <img src={currentUser.profilePicture} alt="" onClick={() => handleOpenStoryModal(userStories)} />
        <button className="create-button" onClick={handleOpenModal}>
          +
        </button>
      </div>

      {isModalOpen && (
        <div className="story-modal">
          <div className="story-modal-content">
            <div className="story-image-upload">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Story"
                  className="preview-image"
                />
              ) : (
                <div
                  onClick={handleFileInputClick}
                  className="upload-placeholder"
                >
                  <span>Select Image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="clear-button" onClick={handleClearModal}>
                Clear
              </button>
              <button className="upload-button" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        data?.map((d, i) => (
          <div className="story" key={i}>
            <img src={d.stories[0].imageUrl} alt="" onClick={() => handleOpenStoryModal(d.stories)} />
            <Link
              to={`/profile/${d.user.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="story-info">
                <img
                  className="story-profile-pic"
                  src={d.user.profilePicture}
                  alt=""
                />
                <span> {d.user.nameSurname}</span>
              </div>
            </Link>
          </div>
        ))
      )}

      {isStoryModalOpen && (
        <StoryModal
            stories={selectedStories}
            onClose={handleCloseStoryModal}
        />
      )}
    </div>
  );
};

export default Stories;
