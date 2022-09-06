import UserNavigationMenu from '../components/userNavigationMenu';
import '../public/css/pages/PatientRecord/patientRecord.css';
import SelectCountry from '../components/selectCountry';

const  CreateUser = () => {
    return (
            <div className="patient-records-container">
                <UserNavigationMenu />
                <div style={{ backgroundColor: 'white', maxWidth: 100}}>
                <form>
                        <h3>Setup Personal Information</h3>
                        <hr />
                        <label for="img">Please upload a clear image of the person's professional license </label>
                        <input type="file" id="img"></input>
                        <label for="license">License Number/ID Number</label>
                        <input type="text" id="license" placeholder="Enter License Number or ID number"></input>
                        <label for="firstname">Firstname</label>
                        <input type="text" id="firstname" placeholder="Enter Firstname"></input>
                        <label for="firstname">Lastname</label>
                        <input type="text" id="lastname" placeholder="Enter Lastname"></input>
                        <label for="e-mail">Email</label>
                        <input type="email" id="e-mail" placeholder="Enter Email Address"></input>
                        <label for="contact">Contact Number</label>
                        <input type="text" id="contact" placeholder="Enter Contact Number"></input>
                        <label for="birthday">Date of Birth</label>
                        <input type="date" id="birthday" placeholder="Enter Birthday"></input>
                        <label for="gender">Gender</label>
                        <select id="gender" placeholder="Select Gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <h3>Setup Account Information</h3>
                        <hr />
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Enter Username"></input>
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password"></input>
                        <label for="confirm">Password</label>
                        <input type="password" id="confirm" placeholder="Re-Enter Confirm Password"></input>
                        <h3>Setup Address Information</h3>
                        <hr />
                        <label for="address">Street Address</label>
                        <input type="text" id="address" placeholder="Enter Street Address"></input>
                        <label for="city">City</label>
                        <input type="text" id="city" placeholder="Enter City" />
                        <SelectCountry />
                        <label for="zipcode">ZIP Code</label>
                        <input type="text" id="zipcode" placeholder="Enter ZIP Code" />
                </form>
                </div>
            </div>
    );
}

export default CreateUser;