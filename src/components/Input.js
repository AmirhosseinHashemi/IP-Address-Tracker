function Input({ inputValue, onInputValue, onFetchingData }) {
  return (
    <form onSubmit={(ev) => onFetchingData(ev)}>
      <input
        type="text"
        placeholder="search for any IP address or domain"
        value={inputValue}
        onChange={(e) => onInputValue(e.target.value)}
      ></input>

      <button aria-label="OK">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
          <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}

export default Input;
