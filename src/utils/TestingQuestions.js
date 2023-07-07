import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useSelector } from 'react-redux';

dayjs.extend(isSameOrAfter);

export function QuestionsUtils() {
  const today = new Date();
  const { orderDetails } = useSelector((state) => state.main);
  const testingData = orderDetails && orderDetails[3]?.data;
  const isYesterdayOrTomorrow = (day, forward) => {
    if (forward) {
      return dayjs(day).isSameOrAfter(today);
    } else {
      return dayjs(day).isBefore(today, 'day');
    }
  };

  const metabolicStatus = testingData?.StandardPackageMetabolicPrep__customerConfirmationStatus === 'Y' ? true : false;
  const metabolicStatusIsNull = testingData?.StandardPackageMetabolicPrep__customerConfirmationStatus === null;
  const hormoneStatus = testingData?.StandardPackageHormonePrep__customerConfirmationStatus === 'Y' ? true : false;
  const hormoneStatusIsNull = testingData?.StandardPackageHormonePrep__customerConfirmationStatus === null;
  const metabolicDate = testingData?.StandardPackageMetabolicPrep__customerConfirmationDate;
  const hormoneDate = testingData?.StandardPackageHormonePrep__customerConfirmationDate;
  const metabolicSampleDate = testingData?.StandardPackageMetabolicSampleCollect__customerConfirmationDate;
  const hormoneSampleDate = testingData?.StandardPackageHormoneSampleCollect__customerConfirmationDate;
  const hormoneSampleStatus = testingData?.StandardPackageHormoneSampleCollect__customerConfirmationStatus === 'Y' ? true : false;
  const hormoneSampleStatusIsNull = testingData?.StandardPackageHormoneSampleCollect__customerConfirmationStatus === null;
  const metabollicSampleStatus = testingData?.StandardPackageMetabolicSampleCollect__customerConfirmationStatus === 'Y' ? true : false;
  const metabollicSampleStatusIsNull = testingData?.StandardPackageMetabolicSampleCollect__customerConfirmationStatus === null;
  const metabolicDateAfterToday = isYesterdayOrTomorrow(metabolicSampleDate, true);
  const metabolicDateBeforeToday = isYesterdayOrTomorrow(metabolicSampleDate, false);
  const hormoneDateBeforeToday = isYesterdayOrTomorrow(hormoneSampleDate, false);
  const hormoneDateAfterToday = isYesterdayOrTomorrow(hormoneSampleDate, true);

  const completeStatus = metabolicStatus && metabollicSampleStatus && hormoneStatus && hormoneSampleStatus;

  const questions = [
    {
      content: `You have not confirmed yet if you are prepared for the Metabolic test on ${dayjs(metabolicDate).format(
        'MMMM DD, YYYY'
      )}. Please check you email for a reminder. Select "Yes" or "No" depending on how your test preparation happened.  `,
      condition: metabolicStatusIsNull
    },
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
      content: `You have not confirmed yet if you are prepared for the Hormone test on ${dayjs(hormoneDate).format(
        'MMMM DD, YYYY'
      )}. Please check you email for a reminder. Select "Yes" or "No" depending on how your test preparation happened.  `,
      condition: hormoneStatusIsNull
    },
    {
      content: 'It seems that you need to reschedule your sampling for Metabolic Test?',
      condition: !metabolicStatus,
      response: 'planning'
    },
    {
      content: 'It seems that you need to reschedule your sampling for Hormone Test?',
      condition: !hormoneStatus,
      response: 'planning'
    },
    {
      content: `You have not confirmed yet if you are prepared for the Metabolic test ${
        metabolicSampleDate ? `on ${dayjs(metabolicSampleDate).format('MMMM DD, YYYY')}` : ''
      }`,
      condition: !metabolicStatus
    },
    {
      content: `You have not confirmed yet if you are prepared for the Hormone test ${
        hormoneSampleDate ? `on ${dayjs(hormoneSampleDate).format('MMMM DD, YYYY')}` : ''
      }`,
      condition: !hormoneStatus
    },
    {
      content: `Your Metabolic sampling date is on ${dayjs(metabolicSampleDate).format(
        'MMMM DD, YYYY'
      )} You can confirm only after that date. Please check you email for a reminder. Select "Yes" or "No" depending on how your test sampling happened.`,
      condition: metabollicSampleStatusIsNull
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
      content: `Your Hormone sampling date is on ${dayjs(hormoneSampleDate).format(
        'MMMM DD, YYYY'
      )} You can confirm only after that date. Please check you email for a reminder. Select "Yes" or "No" depending on how your test sampling happened.`,
      condition: hormoneSampleStatusIsNull
    },
    {
      content: 'It seems that you ran into some problems with sampling of Metabolic test correct?',
      condition: !metabollicSampleStatus,
      response: 'report'
    },
    {
      content: 'It seems that you ran into some problems with sampling of Hormone test correct?',
      condition: !hormoneSampleStatus,
      response: 'report'
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

  return { questions, completeStatus };
}

export function additionalQuestions() {
  const questions = [
    {
      content: 'We are sorry to hear that you had some problems. Do you need to contact us regarding the issue that you had?',
      response: 'contact'
    },
    {
      content: 'Will you require any of the kits re-sent to you? Please note that there will be a fee for this.',
      response: 'kits'
    }
  ];

  return questions;
}
