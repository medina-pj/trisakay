import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// hooks
import useBooking from '../hooks/useBooking';
import { useEffect, useState } from 'react';

export default function Booking() {
  const { documents } = useBooking();

  const [pending, setPending] = useState(0);
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (documents && documents.length) {
      const pending = documents.filter(({ booking_status }) => booking_status === 'Pending');
      const active = documents.filter(({ booking_status }) => booking_status === 'Active');
      const completed = documents.filter(({ booking_status }) => booking_status === 'Complete');
      const total = completed.reduce((acc, curr) => acc + +curr.booking_total, 0);

      setPending(pending.length);
      setActive(active.length);
      setCompleted(completed.length);
      setTotal(total);
    }
  }, [documents]);

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: '15px' }}>
        <Grid item xs={3}>
          <Paper style={{ padding: '15px' }}>
            <Typography component='p' variant='h5'>
              Pending Bookings
            </Typography>
            <Typography component='p' variant='h6'>
              {pending}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper style={{ padding: '15px' }}>
            <Typography component='p' variant='h5'>
              Active Bookings
            </Typography>
            <Typography component='p' variant='h6'>
              {active}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper style={{ padding: '15px' }}>
            <Typography component='p' variant='h5'>
              Completed Bookings
            </Typography>
            <Typography component='p' variant='h6'>
              {completed}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper style={{ padding: '15px' }}>
            <Typography component='p' variant='h5'>
              Total Amount
            </Typography>
            <Typography component='p' variant='h6'>
              {total}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
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
    </div>
  );
}
