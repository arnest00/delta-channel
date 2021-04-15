const formatDate = dateStr => {
    const dateObj = new Date(dateStr);
    const day = dateObj.toLocaleString('default', { weekday: 'short' });
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString();

    return `${day}, ${month} ${date}, ${year}, ${time}`;
  };

export default formatDate;