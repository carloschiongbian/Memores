import { DataGrid } from '@material-ui/data-grid'
import { Table, TableContainer, Paper } from '@mui/material';
const PatientDataTable = ({data, header}) => {
    return (
        <div style={{ display: 'flex', height: 500, fontSize: '38px', width: '100%', borderRadius: '0' }}>
            <TableContainer component={Paper}>
                <DataGrid
                pageSize={5}
                rows={data}
                columns={header}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                />
            </TableContainer>
        </div>
    );
}

export default PatientDataTable;