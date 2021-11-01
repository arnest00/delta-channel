const Status = ({ currentStatus }) => {
  if (!currentStatus) return null;

  if (currentStatus === 'empty') return (
    <section>
      <output>There are no topics. Start a conversation.</output>
    </section>
  );

  return ( 
    <section>
      <output>Now loading...</output>
    </section>
  );
};
 
export default Status;