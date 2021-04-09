const Button = ({ onClick, content, disabled = false, type = 'button' }) => {
  return ( 
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
 
export default Button;