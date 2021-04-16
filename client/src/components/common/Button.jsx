const Button = ({ onClick, content, className = '', disabled = false, type = 'button' }) => {
  return ( 
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  );
};
 
export default Button;