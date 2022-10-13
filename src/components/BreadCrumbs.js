import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {useNavigate} from 'react-router-dom'


const BreadCrumbs = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{color: 'white'}}>
        <Link underline="hover" color="white" style={{cursor: 'pointer'}} onClick={() => navigate('/patient-records')}>
          Patient Records
        </Link>
        <Link
          underline="hover"
          color="white"
          aria-current="page"
          href="#"          
        >
          View Patient
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumbs;