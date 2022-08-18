import '../public/css/components/patientInformation/patientInformation.css';

const PatientInformation = () => {

    let dateObj = new Date();
    let month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let date = month + "/" + day + "/" + year;

    const sample = [ { id: 1, name: "Gon Freecs", age: 16, screenedOn: date }, { id: 2, name: "Gordon Ramsay", age: 35, screenedOn: date } ];
    const emptyData = { id: '-', name: '-', age: '-', screenedOn: '-' };

    return (
        <>
            {
                sample.map((patient, index) => (
                    <div className="patient-data-row" key={index}>
                        <h3>{ patient.id }</h3>
                        <h3>{ patient.name }</h3>
                        <h3>{ patient.age }</h3>
                        <h3>{ patient.screenedOn }</h3>
                        <h3>Actions</h3>
                    </div>
                ))
            }        
        </>
    );
}
 
export default PatientInformation;