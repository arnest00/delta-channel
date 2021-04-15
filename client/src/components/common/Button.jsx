const Button = ({ onClick, content, id = '', disabled = false, type = 'button' }) => {
  return ( 
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      id={id}
    >
      {content}
    </button>
  );
};
 
export default Button;