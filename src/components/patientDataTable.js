import { DataGrid } from '@material-ui/data-grid'
import { Table, TableContainer, Paper } from '@mui/material';
const PatientDataTable = ({data, header}) => {
    return (
        <div style={{ display: 'flex', height: 370, width: '100%' }}>
            <TableContainer component={Paper}>
                <DataGrid
                rows={data}
                columns={header}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                />
            </TableContainer>
        </div>
    );
}

export default PatientDataTable;