import { useSelector } from "react-redux";

function CurrentAvatar() {
  const user = useSelector((state) => state.auth.user.data.user);
  const avatar = user?.avatarImage;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg font-semibold">Your Current Avatar</p>
      <img
        src={avatar || "/avatars/default.svg"}
        alt="Current Avatar"
        className="w-24 h-24 rounded-full border"
      />
    </div>
  );
}

export default CurrentAvatar;
