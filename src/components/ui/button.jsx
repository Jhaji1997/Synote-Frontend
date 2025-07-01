function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  darkBgColor = "dark:bg-blue-300",       
  darkTextColor = "dark:text-dark-text",      
  className = "",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        px-4 py-2 rounded-lg transition duration-200
        ${bgColor} ${textColor} 
        ${darkBgColor} ${darkTextColor}
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"} 
        ${fullWidth ? "w-full" : ""} 
        ${className}
      `}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

export default Button;
