import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Switch,
  Typography
} from '../../../../node_modules/@mui/material/index';
import { CheckBoxRounded, ExpandLess, ExpandMore, ThumbUp } from '../../../../node_modules/@mui/icons-material/index';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Day } from 'utils/CustomPickersDay';

import { addPrepDates, setCompleteHormoneTest } from 'store/reducers/tests';

export default function HormoneTest() {
  const [one, setOne] = useState(false);
  const [oneComplete, setOneComplete] = useState(false);
  const [two, setTwo] = useState(false);
  const [twoComplete, setTwoComplete] = useState(false);
  const [three, setThree] = useState(false);
  const [threeComplete, setThreeComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [response, setResponse] = useState();
  const [delay, setDelay] = useState('');
  const [isDelayed, setisDelayed] = useState();

  const hormoneTestComplete = oneComplete && twoComplete && threeComplete;

  const checkHormoneComplete = () => {
    dispatch(setCompleteHormoneTest(hormoneTestComplete));
  };

  const handleDelays = (event) => {
    setDelay(event.target.value);

    if (event.target.value.toLowerCase() === '0') {
      dispatch(
        addPrepDates({
          ...prepDates,
          hormoneSelectedDay: null,
          hormonePrepDay1: null,
          hormonePrepDay2: null,
          hormonePrepDay3: null,
          hormonePrepDay4: null,
          hormoneTestDay: null
        })
      );
      setisDelayed(false);
    } else {
      const day = dayjs(`${date1?.$y}-${date1?.$M + 2}-${date1?.$D}`).format('MMMM DD, YYYY');
      const day1 = dayjs(`${date1?.$y}-${date1?.$M + 2}-${date1?.$D - 1}`).format('MMMM DD, YYYY');
      const day2 = dayjs(`${date1?.$y}-${date1?.$M + 2}-${date1?.$D - 2}`).format('MMMM DD, YYYY');
      const day3 = dayjs(`${date1?.$y}-${date1?.$M + 2}-${date1?.$D - 3}`).format('MMMM DD, YYYY');
      const day4 = dayjs(`${date1?.$y}-${date1?.$M + 2}-${date1?.$D - 4}`).format('MMMM DD, YYYY');
      const day5 = dayjs(`${date1?.$y}-${date1?.$M + 2}-${date1?.$D + 1}`).format('MMMM DD, YYYY');

      dispatch(
        addPrepDates({
          ...prepDates,
          hormoneSelectedDay: day,
          hormonePrepDay1: day1,
          hormonePrepDay2: day2,
          hormonePrepDay3: day3,
          hormonePrepDay4: day4,
          hormoneTestDay: day5
        })
      );

      setisDelayed(true);
    }
  };

  const handleChangeSamplingDate = (date) => {
    const samplingDate = dayjs(`${date?.$y}-${date?.$M + 1}-${date?.$D}`).format('MMMM DD, YYYY');

    dispatch(addPrepDates({ ...prepDates, hormoneTestSamplingDate: samplingDate }));
    setThreeComplete(true);
  };

  const { prepDates } = useSelector((state) => state.tests);
  const dispatch = useDispatch();

  const [date1, setDate1] = useState();

  const { orderDetails } = useSelector((state) => state.main);
  const planningData = orderDetails && orderDetails[2];
  const planningComplete = planningData?.status.toLowerCase() === 'done' ? !0 : !1;

  const [checked, setChecked] = useState(false);

  const addDates = (date) => {
    setDate1(date);

    handleSamplingDate(date);
  };

  const handleSamplingDate = (date) => {
    const day = dayjs(`${date?.$y}-${date?.$M + 1}-${date?.$D}`).format('MMMM DD, YYYY');
    const day1 = dayjs(`${date?.$y}-${date?.$M + 1}-${date?.$D - 1}`).format('MMMM DD, YYYY');
    const day2 = dayjs(`${date?.$y}-${date?.$M + 1}-${date?.$D - 2}`).format('MMMM DD, YYYY');
    const day3 = dayjs(`${date?.$y}-${date?.$M + 1}-${date?.$D - 3}`).format('MMMM DD, YYYY');
    const day4 = dayjs(`${date?.$y}-${date?.$M + 1}-${date?.$D - 4}`).format('MMMM DD, YYYY');
    const day5 = dayjs(`${date?.$y}-${date?.$M + 1}-${date?.$D + 1}`).format('MMMM DD, YYYY');

    dispatch(
      addPrepDates({
        ...prepDates,
        hormoneSelectedDay: day,
        hormonePrepDay1: day1,
        hormonePrepDay2: day2,
        hormonePrepDay3: day3,
        hormonePrepDay4: day4,
        hormoneTestDay: day5
      })
    );

    setOneComplete(true);
  };

  const hormoneDates = [
    { name: 'Preparation day 1', date: prepDates?.hormonePrepDay1 },
    { name: 'Preparation day 2', date: prepDates?.hormonePrepDay2 },
    { name: 'Preparation day 3', date: prepDates?.hormonePrepDay3 },
    { name: 'Preparation day 4', date: prepDates?.hormonePrepDay4 },
    { name: 'Selected day', date: prepDates?.hormoneSelectedDay },
    { name: 'Testing day', date: prepDates?.hormoneTestDay }
  ];

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleResize = () => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
    } else setIsMobile(false);
  };

  const icon1 = one ? <ExpandLess /> : <ExpandMore />;
  const icon2 = two ? <ExpandLess /> : <ExpandMore />;
  const icon3 = three ? <ExpandLess /> : <ExpandMore />;
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (planningComplete) {
      dispatch(addPrepDates(orderDetails?.data));
    }
  }, [dispatch, orderDetails?.data, planningComplete]);
  return (
    <>
      <Accordion sx={{ width: 'auto', p: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h3">Hormone Test</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={isMobile ? 12 : 6}>
              <Typography variant="body1">Instructions</Typography>
              <Typography variant="body2">
                There are{' '}
                <Typography component="span" sx={{ color: 'primary.main' }}>
                  three
                </Typography>{' '}
                main criteria that dictate when the test can be done
              </Typography>
              <Typography
                onClick={() => {
                  setTwo(false);
                  setThree(false);
                  setOne((current) => !current);
                }}
                sx={{ ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                variant="body2"
              >
                1. Length of your cycle (the test needs to be done 5 days post ovulation) {icon1}
              </Typography>
              <Collapse in={one} timeout="auto" unmountOnExit>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  If you have a regular cycle: For women with a 28 day cycle the test should be done between day 19-22 (day 1 is the 1st day
                  of your menstruation) If the cycle is longer, e.g. 29 days add one day – test between day 20-23 If the cycle is shorter,
                  e.g. 27 days remove one day – test between day 18-21 Adjust according to your cycle length
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  If you have an irregular cycle You will need to use ovulation strips to ensure that you test at the right time. Ovulation
                  strips can be purchased in most pharmacies as well as online Use 1 ovulation test each morning starting on day 7 of your
                  cycle (counting from the first day of flow) until you get the first faint positive result on an ovulation strip. This is
                  considered day one and you will aim to test between days 5 & 7.
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  If you are not menstruating Testing can happen at any time of the month
                </Typography>
                <Box sx={{ ml: 1, mt: 1 }}>
                  <Typography variant="body2" sx={{ color: planningComplete || oneComplete ? 'success.main' : 'warning.main' }}>
                    {planningComplete ? 'Done!' : oneComplete ? 'Testing window set' : 'Enter when your testing window starts'}
                  </Typography>
                  <Box sx={{ pb: 2 }}>
                    {!planningComplete && isMobile && (
                      <>
                        <Box sx={{ diplay: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <DatePicker onChange={addDates} slots={{ day: Day }} slotProps={{ day: { selectedDay: date1 } }} />
                        </Box>
                        <List>
                          {[
                            { color: '#f7c2e4', text: 'Preparation day' },
                            { color: 'primary.main', text: 'Selected day' },
                            { color: '#45d9c9', text: 'Test day' }
                          ].map(({ color, text }, index) => (
                            <ListItem key={index} sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box sx={{ height: '20px', width: '20px', backgroundColor: color }} />
                              <Typography sx={{ ml: 2 }}> : {text}</Typography>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                    <Box>
                      {planningComplete && isMobile ? (
                        <>
                          <Typography variant="body2">This was your plan</Typography>
                          <List>
                            {hormoneDates.map(({ name, date }, index) => (
                              <ListItem key={index}>
                                <Typography>{`${name}: ${dayjs(date).format('MMMM DD, YYYY')}`}</Typography>
                              </ListItem>
                            ))}
                          </List>
                        </>
                      ) : oneComplete && isMobile ? (
                        <>
                          <Typography variant="body2">Here is your plan</Typography>
                          <List>
                            {hormoneDates.map(({ name, date }, index) => {
                              return (
                                <ListItem key={index}>
                                  <Typography>
                                    {date ? `${name}: ${dayjs(date).format('MMMM DD, YYYY')}` : 'Choose proper dates'}
                                  </Typography>
                                </ListItem>
                              );
                            })}
                          </List>
                        </>
                      ) : !planningComplete && !oneComplete ? (
                        <Typography variant="body2" sx={{ color: 'warning.main' }}>
                          You need to select a date to complete this test
                        </Typography>
                      ) : null}
                    </Box>
                  </Box>
                </Box>
              </Collapse>
              <Typography
                onClick={() => {
                  setOne(false);
                  setThree(false);
                  setTwo((current) => !current);
                }}
                sx={{ mt: 2, ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                variant="body2"
              >
                2. Preparation time prior to taking the samples (two days prior to the test there are foods and supplements) to avoid{' '}
                {icon2}
              </Typography>
              <Collapse in={two} timeout="auto" unmountOnExit>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  <Typography variant="body2" component="span" sx={{ color: 'primary.main' }}>
                    Note that:
                  </Typography>
                  It is best to postpone testing if you have had an unusually bad night of sleep. Therefore, avoid planning to test on the
                  last day in the testing window as you may then need to wait a whole month. We suggest to aim for the 1st or 2nd day of
                  your testing window
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  If bad sleep is the norm for you, then contact us to add the insomnia sample to your test (the insomnia test incurs an
                  extra cost)
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  For 48 hours prior to testing you will{' '}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    need to avoid:
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Foods: Avocado, banana, fava beans or too much of any one particular food
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Supplements: Tryrosine, l-Dopa, DLPA, Mucuna, Quercetin
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  For 24 hours prior to testing you will{' '}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    also need to avoid
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Drinks: No caffeine or alcohol day before and day of collection Exercise – no vigorous on day of collection
                </Typography>
                {!planningComplete ? (
                  <>
                    <Typography variant="body2" sx={{ ml: 1, mt: 1, color: 'warning.main' }}>
                      Will you be able to prepare for two days prior the 1st of or maximum the 2nd day of your testing window?
                    </Typography>
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row', py: 2, width: 'fit-content' }}>
                      <FormControlLabel
                        control={
                          <Switch checked={checked} sx={{ color: checked ? 'success.main' : 'error.main' }} onChange={handleChange} />
                        }
                        label={checked ? 'Yes' : 'No'}
                      />
                      <Button
                        sx={{ backgroundColor: '#45d9c9', ':hover': { backgroundColor: '#45c0d9' } }}
                        variant="contained"
                        onClick={() => {
                          setResponse(checked);

                          checked ? setTwoComplete(checked) : setTwoComplete(checked);
                        }}
                        size="small"
                      >
                        Confirm
                      </Button>
                      {response === true ? (
                        <Typography variant="body2" sx={{ color: 'success.main', my: 'auto', ml: 2 }}>
                          <CheckBoxRounded />
                        </Typography>
                      ) : response === false ? (
                        <Box>
                          <Typography variant="body2">
                            If it is not possible to prepare before the 1st or 2nd day of your window you can opt for the 3rd. If this is
                            not possible, we suggest to reschedule for next month instead of using the last day of your testing window
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'warning.main' }}>
                            Will you go ahead with testing this month or will you need to recalculate for next month?
                          </Typography>
                          <FormControl sx={{ minWidth: 120, width: '100%' }}>
                            <InputLabel>Choose Month</InputLabel>
                            <Select value={delay} label="Choose Month" onChange={handleDelays} fullWidth>
                              <MenuItem value="0">This Month</MenuItem>
                              <MenuItem value="1">Next month</MenuItem>
                            </Select>
                            <FormHelperText>This month or Next month</FormHelperText>
                          </FormControl>
                          {isDelayed === true ? (
                            <Typography variant="body2">Please choose another testing window</Typography>
                          ) : isDelayed === false ? (
                            <Typography variant="body2">Check new testing window set for next month</Typography>
                          ) : null}
                        </Box>
                      ) : null}
                    </FormGroup>
                  </>
                ) : (
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    Complete
                  </Typography>
                )}
              </Collapse>
              <Typography
                onClick={() => {
                  setOne(false);
                  setTwo(false);
                  setThree((current) => !current);
                }}
                sx={{ mt: 2, ':hover': { cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' } }}
                variant="body2"
              >
                3. Your availability to take the samples at the specific times required throughout the day {icon3}
              </Typography>
              <Collapse in={three} timeout="auto" unmountOnExit>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Urine and saliva samples will need to be taken throughout the day. See below the collection times so that you can ensure
                  you have the time to take the samples
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Upon waking -1st sample: saliva and urine
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  30 mins after waking- 2nd sample: saliva only
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  60 mins after waking- 3rd sample: saliva
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  2-3hrs after waking -4th sample: urine only
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  16:00-17:00 -5th sample: urine only
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  22:00-24:00- 6th sample: saliva and urine
                </Typography>
                {!planningComplete ? (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ color: 'warning.main' }}>
                      Confirm sampling date
                    </Typography>
                    <DatePicker onChange={handleChangeSamplingDate} />
                    {prepDates?.hormoneTestSamplingDate && isMobile && (
                      <Typography variant="body2">{`Sampling Date: ${dayjs(prepDates?.hormoneTestSamplingDate).format(
                        'MMMM DD, YYYY'
                      )}`}</Typography>
                    )}
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    Complete
                  </Typography>
                )}
              </Collapse>
            </Grid>
            {!isMobile && (
              <Grid item xs={isMobile ? 12 : 6}>
                <Typography variant="body1">Select a Date</Typography>
                <Box sx={{ width: 'full', height: 'full', position: 'relative' }}>
                  <DateCalendar onChange={addDates} slots={{ day: Day }} slotProps={{ day: { selectedDay: date1 } }} />
                  <List>
                    {[
                      { color: '#f7c2e4', text: 'Preparation day' },
                      { color: 'primary.main', text: 'Selected day' },
                      { color: '#45d9c9', text: 'Test day' }
                    ].map(({ color, text }, index) => (
                      <ListItem key={index} sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ height: '20px', width: '20px', backgroundColor: color }} />
                        <Typography sx={{ ml: 2 }}> : {text}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  {planningComplete ? (
                    <>
                      <Typography variant="body2">This was your plan</Typography>
                      <List>
                        {hormoneDates.map(({ name, date }, index) => (
                          <ListItem key={index}>
                            <Typography>{`${name}: ${dayjs(date).format('MMMM DD, YYYY')}`}</Typography>
                          </ListItem>
                        ))}
                        {planningComplete && (
                          <Typography>{`Completed on: ${dayjs(prepDates?.completedAt).format('MMMM DD, YYYY')}`}</Typography>
                        )}
                      </List>
                    </>
                  ) : oneComplete && !isDelayed ? (
                    <>
                      <Typography variant="body2">This is your plan</Typography>
                      <List>
                        {hormoneDates.map(({ name, date }, index) => (
                          <ListItem key={index}>
                            {date ? `${name}: ${dayjs(date).format('MMMM DD, YYYY')}` : 'Choose proper dates'}
                          </ListItem>
                        ))}
                        {prepDates?.hormoneTestSamplingDate && (
                          <ListItem>
                            <Typography>{`Sampling Date: ${dayjs(prepDates?.hormoneTestSamplingDate).format('MMMM DD, YYYY')}`}</Typography>
                          </ListItem>
                        )}
                      </List>
                    </>
                  ) : null}
                </Box>
              </Grid>
            )}
          </Grid>
          <Button
            fullWidth
            disabled={!hormoneTestComplete}
            onClick={checkHormoneComplete}
            startIcon={<ThumbUp />}
            sx={{ mx: 'auto', mt: 5, backgroundColor: '#45d9c9', ':hover': { backgroundColor: '#45c0d9' } }}
            variant="contained"
          >
            Proceed
          </Button>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography sx={{ color: hormoneTestComplete || planningComplete ? 'success.main' : 'warning.main' }} variant="caption">
              {planningComplete ? 'Complete' : !hormoneTestComplete ? 'Please finish all steps to proceed' : null}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
