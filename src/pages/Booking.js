import { useState } from 'react';
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import ButtonField from '../components/Button';
import InputField from '../components/InputField';
import ModalComponent from '../components/Modal';

// hooks
import useBooking from '../hooks/useBooking';

export default function Booking() {
  const { documents, deleteRecord } = useBooking();

  console.log(documents);

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
                return (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='data'>
                      {i + 1}
                    </TableCell>
                    <TableCell>{data.booking_date}</TableCell>
                    <TableCell>{data?.passenger?.user_name || ''}</TableCell>
                    <TableCell>{data?.rider?.rider_name || ''}</TableCell>
                    <TableCell>{data.booking_distance}</TableCell>
                    <TableCell>{data.booking_total}</TableCell>
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
