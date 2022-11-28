import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

// hooks
import ButtonField from '../components/Button';
import InputField from '../components/InputField';
import useSettings from '../hooks/useSettings';

export default function Settings() {
  const { documents, onUpdate } = useSettings();
  const [id, setId] = useState(null);
  const [addRate, setAddRate] = useState(0);
  const [baseRate, setBaseRate] = useState(0);

  useEffect(() => {
    if (documents && documents.length) {
      setId(documents[0].id);
      setAddRate(documents[0].add_rate);
      setBaseRate(documents[0].base_rate);
    }
  }, [documents]);

  return (
    <Box>
      <label>Add Rate</label>
      <br />
      <InputField value={addRate} onChange={e => setAddRate(e.target.value)} />
      <br />
      <label>Base Rate</label>
      <br />
      <InputField value={baseRate} onChange={e => setBaseRate(e.target.value)} />
      <br />
      <ButtonField
        label={'Update'}
        onClick={() =>
          onUpdate(id, {
            add_rate: addRate,
            base_rate: baseRate,
          })
        }
      />
    </Box>
  );
}
