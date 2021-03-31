const formatDate = dateStr => {
    const dateObj = new Date(dateStr);
    const day = dateObj.toLocaleString('default', { weekday: 'short' });
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

export default formatDate;