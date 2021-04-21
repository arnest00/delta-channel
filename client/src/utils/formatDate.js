const formatDate = dateStr => {
    const dateObj = new Date(dateStr);
    const day = dateObj.toLocaleString('default', { weekday: 'short' });
    const month = dateObj.toLocaleString('default', { month: 'numeric' });
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return `${month}/${date}/${year}(${day})${time.replace('AM','').replace('PM','')}`;
  };

export default formatDate;