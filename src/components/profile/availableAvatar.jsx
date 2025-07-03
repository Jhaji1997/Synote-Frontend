const avatarList = Array.from({ length: 20 }, (_, i) => `/avatars/avatar${i + 1}.svg`);

function AvailableAvatars({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-4 mt-6">
      {avatarList.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          onClick={() => onSelect(avatar)}
          className={`w-16 h-16 rounded-full border-2 cursor-pointer transition-all ${
            selected === avatar ? "border-blue-500 scale-105" : "border-gray-300"
          }`}
          alt={`Avatar ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default AvailableAvatars;
