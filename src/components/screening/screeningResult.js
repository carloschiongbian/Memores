const ScreeningResult = () => {
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
                        <tr>
                            <td className="text-danger">Positive</td>
                            <td className="text-danger">80%</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <p className="text-center">Based on the screening test, the result for <span className="text-primary fw-bold">Schmoe Joe</span> shows a <span className="text-danger fw-bold">manifestation of social anxiety disorder</span> with a prediction probability of <span className="text-danger fw-bold">88%</span>.</p>
        </div>
    );
}

export default ScreeningResult;