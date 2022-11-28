import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

// hooks
import useBooking from '../hooks/useBooking';

export default function Booking() {
  const { documents } = useBooking();

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Passenger</TableCell>
              <TableCell>Rider</TableCell>
              <TableCell>Estimated Distance</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Current Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents &&
              documents.map((data, i) => {
                const passenger = `${data?.passenger?.user_firstname || ''} ${
                  data?.passenger?.user_lastname || ''
                }`;

                const rider = `${data?.rider?.user_firstname || ''} ${
                  data?.rider?.user_lastname || ''
                }`;

                return (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='data'>
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      {moment(data.booking_date.seconds * 1000).format('MMM DD, YYYY hh:mm:ss A')}
                    </TableCell>
                    <TableCell>{passenger}</TableCell>
                    <TableCell>{rider}</TableCell>
                    <TableCell>{data.booking_distance}</TableCell>
                    <TableCell>P {data.booking_total}</TableCell>
                    <TableCell>{data.booking_status}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
