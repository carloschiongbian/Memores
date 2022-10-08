import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const BreadCrumbs = () => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/patientRecord">
          Patient Records
        </Link>
        <Link
          underline="hover"
          color="text.primary"
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