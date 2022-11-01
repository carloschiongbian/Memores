// import { DataGrid } from '@material-ui/data-grid'
// import { TableContainer, Paper } from '@mui/material';
import MaterialReactTable from "material-react-table";

const DataTable = ({ data, columns, loading }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{ isLoading: loading }}
    />
  );
};

export default DataTable;
