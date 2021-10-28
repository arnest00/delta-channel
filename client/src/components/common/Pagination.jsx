const Pagination = ({ contentCount, pageSize, currentPage, onPageChange }) => {
  const numPages = Math.ceil(contentCount / pageSize);

  return (
    <div className='pagination-menu'>
      {[...Array(numPages)].map((page, idx) => (
        <a 
          key={idx} 
          onClick={() => onPageChange(idx)}
          disabled={currentPage === idx}
        >{idx + 1}</a>
      ))}
    </div>
  );
};

export default Pagination;