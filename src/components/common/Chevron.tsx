const Chevron = ({ callback, direction }: any): JSX.Element => (
  <div
    className="fc"
    style={{
      justifyContent: 'center',
      flex: '0 0 20px',
    }}
  >
    <div
      className="fc-toolbar-chunk"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        className="fc-prev-button fc-button fc-button-primary"
        onClick={callback}
      >
        <span className={`fc-icon fc-icon-chevron-${direction}`} />
      </button>
    </div>
  </div>
);

export default Chevron;
