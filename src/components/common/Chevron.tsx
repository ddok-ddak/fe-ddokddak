const Chevron = ({ callback, direction }: any): JSX.Element => (
  <div className="fc">
    <div className="fc-toolbar-chunk">
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
