import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../store/authSlice.js";
import CurrentAvatar from "../components/profile/currentAvatar.jsx";
import AvailableAvatars from "../components/profile/availableAvatar.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AvatarUpdatePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.data?.user);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  const handleCancel = () => navigate("/");

  const handleSave = () => {
    if (selectedAvatar && selectedAvatar !== user.avatarImage) {
      dispatch(updateAvatar(selectedAvatar));
      setSelectedAvatar(null);
      navigate("/");
    }
  };

  if (!user) return <div className="text-center py-10 text-gray-500">You need authorization for this route</div>;

  const hasChanged = selectedAvatar && selectedAvatar !== user.avatarImage;

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">Update Your Avatar</h1>
        
        <CurrentAvatar />

        <AvailableAvatars
          selected={selectedAvatar || user.avatarImage}
          onSelect={setSelectedAvatar}
        />

        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-400 dark:border-gray-600 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanged}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarUpdatePage;
