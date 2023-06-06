import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

dayjs.extend(isSameOrAfter);

export function QuestionsUtils() {
  const today = new Date();
  const { orderDetails, selectedOrder } = useSelector((state) => state.main);
  const testingData = orderDetails && orderDetails[3]?.data;
  console.log('orderDetails', orderDetails);
  console.log('selctedOrder', selectedOrder);
  const isYesterdayOrTomorrow = (day, forward) => {
    if (forward) {
      return dayjs(day).isSameOrAfter(today);
    } else {
      return dayjs(day).isBefore(today, 'day');
    }
  };

  const metabolicStatus = testingData?.StandardPackageMetabolicPrep__customerConfirmationStatus === 'Y' ? true : false;
  const hormoneStatus = testingData?.StandardPackageHormonePrep__customerConfirmationStatus === 'Y' ? true : false;
  const metabolicDate = testingData?.StandardPackageMetabolicPrep__customerConfirmationDate;
  const hormoneDate = testingData?.StandardPackageHormonePrep__customerConfirmationDate;
  const metabolicSampleDate = testingData?.StandardPackageMetabolicSampleCollect__customerConfirmationDate;
  const hormoneSampleDate = testingData?.StandardPackageHormoneSampleCollect__customerConfirmationDate;
  const hormoneSampleStatus = testingData?.StandardPackageHormoneSampleCollect__customerConfirmationStatus === 'Y' ? true : false;
  const metabollicSampleStatus = testingData?.StandardPackageMetabolicSampleCollect__customerConfirmationStatus === 'Y' ? true : false;
  const metabolicDateAfterToday = isYesterdayOrTomorrow(metabolicSampleDate, true);
  const metabolicDateBeforeToday = isYesterdayOrTomorrow(metabolicSampleDate, false);
  const hormoneDateBeforeToday = isYesterdayOrTomorrow(hormoneSampleDate, false);
  const hormoneDateAfterToday = isYesterdayOrTomorrow(hormoneSampleDate, true);

  const questions = [
    {
      content: `You confirmed that you are ready to go ahead with the sampling of Metabolic test on ${dayjs(metabolicDate).format(
        'MMMM DD, YYYY'
      )}`,
      condition: metabolicStatus
    },
    {
      content: `You confirmed that you are ready to go ahead with the sampling of Hormone test on ${dayjs(hormoneDate).format(
        'MMMM DD, YYYY'
      )}`,
      condition: hormoneStatus
    },
    {
      content: 'It seems that you need to reschedule your sampling for Metabolic Test?',
      condition: !metabolicStatus
    },
    {
      content: 'It seems that you need to reschedule your sampling for Hormone Test?',
      condition: !hormoneStatus
    },
    {
      content: `You have not confirmed yet if you are prepared for the Metabolic test on ${dayjs(metabolicSampleDate).format(
        'MMMM DD, YYYY'
      )}`,
      condition: !metabolicStatus
    },
    {
      content: `You have not confirmed yet if you are prepared for the Hormone test on ${dayjs(hormoneSampleDate).format('MMMM DD, YYYY')}`,
      condition: !hormoneStatus
    },
    {
      content: `You confirmed on ${dayjs(metabolicSampleDate).format(
        'MMMM DD, YYYY'
      )} that sampling of Metabolic test was successful. Great!!`,
      condition: metabollicSampleStatus
    },
    {
      content: `You confirmed on ${dayjs(hormoneSampleDate).format('MMMM DD, YYYY')} that sampling of Hormone test was successful. Great!!`,
      condition: hormoneSampleStatus
    },
    {
      content: 'It seems that you ran into some problems with sampling of Metabolic test correct?',
      condition: !metabollicSampleStatus
    },
    {
      content: 'It seems that you ran into some problems with sampling of Hormone test correct?',
      condition: !hormoneSampleStatus
    },
    {
      content: `Your Metabolic sampling date is on ${metabolicSampleDate}. You can confirm only after that date.`,
      condition: !metabollicSampleStatus && metabolicDateAfterToday
    },
    {
      content: `You have not confirmed yet if your sampling went ok`,
      condition: !metabollicSampleStatus && metabolicDateBeforeToday
    },
    {
      content: `Your Hormone sampling date is on ${hormoneSampleDate}. You can confirm only after that date.`,
      condition: !hormoneSampleStatus && hormoneDateAfterToday
    },
    {
      content: `You have not confirmed yet if your sampling went ok`,
      condition: !hormoneSampleStatus && hormoneDateBeforeToday
    }
  ];

  return questions;
}
