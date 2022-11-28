import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

// hooks
import usePassenger from '../hooks/usePassenger';

const Passenger = () => {
  const { documents } = usePassenger();

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents &&
              documents.map((data, i) => {
                const name = `${data.user_firstname} ${data.user_lastname}`;

                return (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='data'>
                      {i + 1}
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{data.user_contact}</TableCell>
                    <TableCell>{data.user_address}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Passenger;
