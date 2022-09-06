import { DataGrid } from '@material-ui/data-grid'
import { TableContainer, Paper } from '@mui/material';
const DataTable = ({data, header}) => {
    return (
        <div style={{ display: 'flex', height: 500 }}>
            <TableContainer component={Paper}>
                <DataGrid
                rows={data}
                columns={header}
                />
            </TableContainer>
        </div>
    );
}

export default DataTable;