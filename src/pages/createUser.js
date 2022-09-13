import UserNavigationMenu from '../components/userNavigationMenu';
import '../public/css/pages/PatientRecord/patientRecord.css';
import SelectCountry from '../components/selectCountry';

const  CreateUser = () => {
    return (
            <div className="patient-records-container">
            <UserNavigationMenu />
                 <form>
                <div class="container">
                        <div class="row">
                                <div class="col">
                                <h3>Setup Personal Information</h3>
                                    <hr />
                                    <div class="form-group">
                                        <label for="img" className="form-label">Please upload a clear image of the person's professional license </label>
                                        <input type="file" id="img" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="license" className="form-label">License Number/ID Number</label>
                                        <input type="text" id="license" placeholder="Enter License Number or ID number" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="firstname" className="form-label">Firstname</label>
                                        <input type="text" id="firstname" placeholder="Enter Firstname" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="lastname" className="form-label">Lastname</label>
                                        <input type="text" id="lastname" placeholder="Enter Lastname" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="e-mail" className="form-label">Email</label>
                                        <input type="email" id="e-mail" placeholder="Enter Email Address" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="contact" className="form-label">Contact Number</label>
                                        <input type="text" id="contact" placeholder="Enter Contact Number" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="birthday"  className="form-label">Date of Birth</label>
                                        <input type="date" id="birthday" placeholder="Enter Birthday" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="gender" className="form-label">Gender</label>
                                        <select id="gender" placeholder="Select Gender" className="form-control">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                            <h3>Setup Account Information</h3>
                                            <hr />
                                    <div class="form-group">
                                        <label for="username" className="form-label">Username</label>
                                        <input type="text" id="username" placeholder="Enter Username" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="password" className="form-label">Password</label>
                                        <input type="password" id="password" placeholder="Enter Password" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="confirm" className="form-label">Password</label>
                                        <input type="password" id="confirm" placeholder="Re-Enter Confirm Password" className="form-control"/>
                                    </div>
                                        <h3>Setup Address Information</h3>
                                        <hr />
                                    <div class="form-group">
                                        <label for="address" className="form-label">Street Address</label>
                                        <input type="text" id="address" placeholder="Enter Street Address" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="city" className="form-label">City</label>
                                        <input type="text" id="city" placeholder="Enter City" className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <SelectCountry />
                                    </div>
                                    <div class="form-group">
                                        <label for="zipcode" className="form-label">ZIP Code</label>
                                        <input type="text" id="zipcode" placeholder="Enter ZIP Code" className="form-control"/>
                                    </div>   
                                     <hr />
                                        <button type="submit" class="btn btn-primary form-control">Create User</button>
                                     <hr />
                             </div>
                         </div>
                    </div>                 
                </form>
            </div>
    );
}

export default CreateUser;