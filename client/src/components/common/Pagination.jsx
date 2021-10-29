const Pagination = ({ contentCount, pageSize, currentPage, onPageChange }) => {
  const numPages = Math.ceil(contentCount / pageSize);
  if (numPages === 1) return null;

  return (
    <div className='pagination-menu'>
      {[...Array(numPages)].map((page, idx) => (
        <button 
          key={idx} 
          className='pagination-link'
          onClick={() => onPageChange(idx)}
          disabled={currentPage === idx}
        >{idx + 1}</button>
      ))}
    </div>
  );
};

export default Pagination;