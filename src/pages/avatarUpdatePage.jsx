import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../store/authSlice.js";
import CurrentAvatar from "../components/profile/currentAvatar.jsx";
import AvailableAvatars from "../components/profile/availableAvatar.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AvatarUpdatePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.data.user);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const navigate=useNavigate()

  const handleCancel = () => navigate("/");

  const handleSave = () => {
    if (selectedAvatar && selectedAvatar !== user.avatarImage) {
      dispatch(updateAvatar(selectedAvatar));
      setSelectedAvatar(null);
      navigate("/")
    }
  };

  if (!user) return <div>Loading...</div>;

  const hasChanged = selectedAvatar && selectedAvatar !== user.avatarImage;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Update Avatar</h1>
      <CurrentAvatar />
      <AvailableAvatars
        selected={selectedAvatar || user.avatarImage}
        onSelect={setSelectedAvatar}
      />
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={!hasChanged}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AvatarUpdatePage;
