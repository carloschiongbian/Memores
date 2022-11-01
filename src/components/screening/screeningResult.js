const calc = (number) => {
  let with2Decimals = number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  return with2Decimals;
};

const ScreeningResult = ({
  classification,
  classProbability,
  patientSelected,
}) => {
  const _class = classification === "0" ? "Negative" : "Positive";
  const _probability = calc(Number(classProbability) * 100);
  const positiveIndicative = <span className="text-danger fw-bold">DOES</span>;
  const negativeIndicative = (
    <span className="text-success fw-bold">DOES NOT</span>
  );

  return (
    <div className="container py-4">
      <h4 className="fw-bold">Screening Result</h4>

      <div className="d-flex justify-content-center my-4">
        <table className="table w-50 fs-4">
          <thead className="text-center">
            <tr className="fs-6">
              <th>Classification</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody className="text-center fw-bold">
            <tr
              className={_class === "Negative" ? "text-success" : "text-danger"}
            >
              <td>{_class}</td>
              <td>{_probability}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-center">
        Based on the screening test, the result for{" "}
        <span className="text-primary fw-bold">{patientSelected.fullname}</span>{" "}
        {_class === "Negative" ? negativeIndicative : positiveIndicative} show a{" "}
        <span
          className={`fw-bold ${
            _class === "Negative" ? "text-success" : "text-danger"
          }`}
        >
          manifestation of social anxiety disorder
        </span>{" "}
        with a prediction probability of{" "}
        <span
          className={`fw-bold ${
            _class === "Negative" ? "text-success" : "text-danger"
          }`}
        >
          {_probability}%
        </span>
        .
      </p>
    </div>
  );
};

export default ScreeningResult;
