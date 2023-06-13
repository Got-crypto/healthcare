import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  Grid,
  List,
  ListItem,
  Typography
} from '../../../../node_modules/@mui/material/index';
import { ExpandLess, ExpandMore, ThumbUp } from '../../../../node_modules/@mui/icons-material/index';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { addPrepDates } from 'store/reducers/tests';
import { handleFinishPlanning } from 'services/BeOne';
import { LoadingButton } from '../../../../node_modules/@mui/lab/index';

import { Day } from 'utils/CustomPickersDay';

export default function MetabollicTest({ successMessage, setSuccessMessage }) {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [date2, setDate2] = useState();
  const [metabollicPlanningComplete, setMetabollicPlanningComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { orderDetails, selectedOrder } = useSelector((state) => state.main);
  const { prepDates, hormorneTestComplete } = useSelector((state) => state.tests);
  const dispatch = useDispatch();
  const planningData = orderDetails && orderDetails[2];
  const planningComplete = planningData?.status.toLowerCase() === 'done' ? !0 : !1;

  const handleChangeMetabollicTestDate = (date2) => {
    setDate2(date2);

    const day = dayjs(date2).format('MMMM DD, YYYY');
    const day1 = dayjs(date2).subtract(1, 'day').format('MMMM DD, YYYY');
    const day2 = dayjs(date2).subtract(2, 'day').format('MMMM DD, YYYY');
    const day3 = dayjs(date2).subtract(3, 'day').format('MMMM DD, YYYY');
    const day4 = dayjs(date2).subtract(4, 'day').format('MMMM DD, YYYY');
    const day5 = dayjs(date2).add(1, 'day').format('MMMM DD, YYYY');

    dispatch(
      addPrepDates({
        ...prepDates,
        metabolicTestSamplingDate: day,
        metabolicPrepDay1: day4,
        metabolicPrepDay2: day3,
        metabolicPrepDay3: day2,
        metabolicPrepDay4: day1,
        metabolicTestDay: day5
      })
    );
    setMetabollicPlanningComplete(true);
  };

  const finishPlanning = async () => {
    try {
      setIsLoading(true);
      const response = await handleFinishPlanning(selectedOrder?.orderId, {
        hormoneSkipReminder1: true,
        hormoneSkipReminder2: true,
        hormoneTestSamplingDate: dayjs(prepDates?.hormoneTestSamplingDate).format('YYYY-MM-DD'),
        hormoneTestWindowStartDate: dayjs(prepDates?.hormoneSelectedDay).format('YYYY-MM-DD'),
        metabolismSkipReminder1: true,
        metabolismSkipReminder2: true,
        metabolismTestSamplingDate: dayjs(prepDates?.metabolicTestSamplingDate).format('YYYY-MM-DD'),
        periodCycleLength: 10,
        testOption: 'OPTION_1'
      });
      setIsLoading(false);
      setSuccessMessage(response?.data?.message);
    } catch (error) {
      setError(
        error?.data?.status === 500 && metabollicPlanningComplete && hormorneTestComplete
          ? error?.data?.errors
          : 'Sorry, This step is not active'
      );
      setIsLoading(false);
      console.log('error finishing planning', error);
    }
  };

  const icon1 = one ? <ExpandLess /> : <ExpandMore />;
  const icon2 = two ? <ExpandLess /> : <ExpandMore />;
  const icon3 = three ? <ExpandLess /> : <ExpandMore />;

  const metabolicDates = [
    { name: 'Preparation day 1', date: prepDates?.metabolicPrepDay1 },
    { name: 'Preparation day 2', date: prepDates?.metabolicPrepDay2 },
    { name: 'Preparation day 3', date: prepDates?.metabolicPrepDay3 },
    { name: 'Preparation day 4', date: prepDates?.metabolicPrepDay4 },
    { name: 'Selected day', date: prepDates?.metabolicTestSamplingDate },
    { name: 'Testing day', date: prepDates?.metabolicTestDay }
  ];

  return (
    <>
      <Accordion sx={{ width: 'auto', p: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h3">Metabollic, Immune and Thyroid Test</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Typography variant="subtitle" sx={{ ml: 1, mt: 5, color: 'warning.main' }}>
              Aim to schedule this test as close as possible to the previous one – ideally within the same week. Please note that the
              sampling process will take two days and testing cannot happen during mensuration
            </Typography>
            <Grid item xs={12}>
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
                1. Testing cannot happen while menstruating {icon1}
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
                2. Preparation time prior to taking the samples (two days prior to the test there are foods and supplements) {icon2}
              </Typography>
              <Collapse in={two} timeout="auto" unmountOnExit>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  For 48 hours prior to testing you will need to:
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - Discontinue all non-essential medication and supplements, including fortified food and drinks or meal replacement.{' '}
                  <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                    Do not stop essential medications{' '}
                  </Typography>
                  such as heart medication, thyroid hormones etc
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - Avoid Seafood
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - Continue with these food + supplement restrictions until all your samples are completely collected
                </Typography>
                <Typography variant="body2" sx={{ ml: 1, color: 'warning.main' }}>
                  If in any way unsure, please contact us.
                </Typography>
                <Typography variant="body2" sx={{ ml: 1, mt: 2 }}>
                  24 hours before the test
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Eat your usual diet, with the exception of any fortified foods/drinks and meal replacements
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Also avoid over consuming any single food.
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Limit fluid intake to 2 litres of fluids for the 24 hours period before urine collection
                </Typography>
                <Typography variant="body2" sx={{ ml: 1, mt: 2 }}>
                  The night before the bloodspot sample collection
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Fast starting at least 8 hours prior to the morning collection
                </Typography>
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
                3. Timings and requirements for day one and day two of testing {icon3}
              </Typography>
              <Collapse in={three} timeout="auto" unmountOnExit>
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                  Day 1
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Total time required: 30-45 minutes
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Need to collect first morning urine and some drops of blood before eating or drinking anything
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Also, will need to collect each urination for the entire day (some patients prefer to do this when they can be at home)
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  You will need access to:
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - A timer/clock and a camera (your phone will work for both)
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - Warm water
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - A freezer to prepare the freeze block needed on day
                </Typography>
                <Typography variant="body2" sx={{ ml: 1, mt: 2, fontWeight: 'bold' }}>
                  Day 2
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Total time required: 30-45 minutes
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Need to collect mouth swabs before eating, drinking or brushing teeth and urine before eating or drinking
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Ensure that DHL has been booked to pick up the samples
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  You will need access to:
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - a glass or a container to allow the swabs to dry without touching anythin
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  - A freezer for at least 2 hours to ensure the samples are frozen before sending
                </Typography>
                {!planningComplete && (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      width: '100%',
                      alignItems: 'start'
                    }}
                  >
                    <Typography variant="body2" sx={{ ml: 1, mt: 1, color: 'warning.main' }}>
                      Taking into account your menstruation, preparation and sampling requirements, Confirm the first day of the two
                      consecutive sampling dates.
                    </Typography>
                    <DatePicker
                      onChange={handleChangeMetabollicTestDate}
                      slots={{ day: Day }}
                      slotProps={{ day: { selectedDay: date2 } }}
                    />
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
                    <Typography variant="body2">Here is your plan</Typography>
                    <List>
                      {metabolicDates.map(({ name, date }, index) => {
                        return (
                          <ListItem key={index}>
                            <Typography>{date ? `${name}: ${dayjs(date).format('MMMM DD, YYYY')}` : 'Choose proper dates'}</Typography>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                )}
              </Collapse>
            </Grid>
          </Grid>
          {metabollicPlanningComplete && (
            <Typography variant="body1" sx={{ mt: 2 }}>{`Hormone Metebolic Test Date: ${dayjs(date2).format('MMMM DD, YYYY')}`}</Typography>
          )}
          {planningComplete && (
            <Typography variant="body1" sx={{ mt: 2, color: 'success.main' }}>{`Hormone Metabolic Test Date was done at: ${dayjs(
              prepDates?.metabolicSamplingSelectedDay
            ).format('MMMM DD, YYYY')}`}</Typography>
          )}
          <LoadingButton
            fullWidth
            loading={isLoading}
            disabled={planningComplete ? false : metabollicPlanningComplete && hormorneTestComplete ? false : true}
            startIcon={<ThumbUp />}
            sx={{ mx: 'auto', backgroundColor: '#45d9c9', ':hover': { backgroundColor: '#45c0d9' }, mt: 5 }}
            variant="contained"
            onClick={finishPlanning}
          >
            Finish Planning
          </LoadingButton>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            {successMessage && (
              <Typography variant="body1" sx={{ color: 'success.main' }}>
                {successMessage}
              </Typography>
            )}
            {error && (
              <Typography variant="body1" sx={{ color: 'error.main' }}>
                {error}
              </Typography>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
