import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

// hooks
import useRider from '../hooks/useRider';
import ButtonField from '../components/Button';

export default function Rider() {
  const { documents, onApprove, onDecline } = useRider();

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
              <TableCell>Account Status</TableCell>
              <TableCell>License Url</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
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
                    <TableCell>{data?.user_status}</TableCell>
                    <TableCell>
                      <a href={data?.license_url} target='_blank' rel='noreferrer noopener'>
                        {data?.license_url ? 'Open File' : 'No File Uploaded'}
                      </a>
                    </TableCell>
                    <TableCell>
                      {(data?.user_status === 'Pending' || data?.user_status === 'Declined') && (
                        <ButtonField
                          label={'Approve'}
                          size={'small'}
                          color={'success'}
                          onClick={() => onApprove(data.id)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {(data?.user_status === 'Pending' || data?.user_status === 'Approved') && (
                        <ButtonField
                          label={'Decline'}
                          size={'small'}
                          color={'error'}
                          onClick={() => onDecline(data.id)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
