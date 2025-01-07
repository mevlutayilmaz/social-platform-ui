import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AuthService from "../../services/AuthService";

const Stories = () => {
  const mockStories = [
    { id: 1, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiz48_QX01W-L61Kv7XMPAubkBQDFxkJoUFA&s", name: "Story 1" },
    { id: 2, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy6UET0eQ6n68Re7B1rVfn4nR_4yOSiaaD8Q&s", name: "Story 2" },
    { id: 3, img: "https://cdn.pixabay.com/photo/2023/10/23/17/53/bird-8336583_1280.jpg", name: "Story 3" },
    { id: 4, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiz48_QX01W-L61Kv7XMPAubkBQDFxkJoUFA&s", name: "Story 4" },
    { id: 5, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy6UET0eQ6n68Re7B1rVfn4nR_4yOSiaaD8Q&s", name: "Story 5" },
    { id: 6, img: "https://cdn.pixabay.com/photo/2023/10/23/17/53/bird-8336583_1280.jpg", name: "Story 6" },
  ];

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"], // Query key
    queryFn: async () => {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockStories), 1000)
      );
    },
    initialData: mockStories, // Uygulama başlangıcında kullanılacak veri
  });

  return (
    <div className="stories">
      <div className="story">
        <img src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png" alt="" />
        <span>{AuthService.getUsername()}</span>
        <button>+</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
