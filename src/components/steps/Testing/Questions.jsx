import {
  Box,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography
} from '../../../../node_modules/@mui/material/index';
import { useSelector } from 'react-redux';
import { Info, Inventory } from '../../../../node_modules/@mui/icons-material/index';
import { useState } from 'react';

import { QuestionsUtils } from 'utils/TestingQuestions';

export default function Testing() {
  const { orderDetails } = useSelector((state) => state.main);
  const testingData = orderDetails ? orderDetails[3]?.data : null;
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const hormoneSampleStatus = testingData?.StandardPackageHormoneSampleCollect__customerConfirmationStatus === 'Y' ? true : false;

  const questions = QuestionsUtils();

  console.log('questions', questions);

  console.log('testingData', testingData);
  return (
    <Box>
      <List fullWidth dense>
        {questions.map(({ content, condition }, index) => {
          console.log('condition', condition);

          return (
            condition && (
              <ListItem
                key={index}
                sx={{ width: '100%', gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary={content} />
              </ListItem>
            )
          );
        })}
      </List>

      {!hormoneSampleStatus && (
        <Box fullWidth>
          <Typography>Will you require any of the kits re-sent to you?</Typography>
          <FormGroup sx={{ width: 'fit-content' }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} defaultChecked={!1} />}
              label={checked ? 'Enable kits' : "I'd rather not"}
            />
          </FormGroup>
        </Box>
      )}
      {checked && (
        <List>
          <ListItem sx={{ width: '100%', gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Hormone Test" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Metabolic Test" secondary={'click to select'} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Thyroid Test" secondary={'click to select'} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Immune Test" secondary={'click to select'} />
          </ListItem>
        </List>
      )}
    </Box>
  );
}
