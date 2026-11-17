
const UserAvatar = ({ name, size = "w-9 h-9" }) => {
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  return (
    <div
      className={`${size} flex items-center justify-center rounded-full
      border-2 border-primary bg-primary/10 text-primary
      font-semibold uppercase select-none`}
      title={name || "User"}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
