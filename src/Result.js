function Result({ ipInfo }) {
  const {
    ip,
    isp,
    location: { country, city, timezone },
  } = ipInfo;

  return (
    <div className="result">
      <p className="result__data">
        <span className="result__title">IP ADDRESS</span>
        {ip}
      </p>

      <p className="result__data">
        <span className="result__title">LOCATION</span>
        {`${city}, ${country}`}
      </p>

      <p className="result__data">
        <span className="result__title">TIMEZONE</span>
        UTC{timezone}
      </p>

      <p className="result__data">
        <span className="result__title">ISP</span>
        {isp}
      </p>
    </div>
  );
}

export default Result;
