import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay'
})(({ theme, dayIsBetween, isFirstDay, isLastDay, isprepday, istestday }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark
    }
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  }),
  ...(JSON.parse(isprepday) && {
    background: '#f7c2e4',
    color: 'black'
  }),
  ...(JSON.parse(istestday) && {
    background: '#45d9c9'
  }),
}));

export function Day({ day, selectedDay, ...other }) {
  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const start = selectedDay.subtract(4, 'day');
  const end = selectedDay.add(1, 'day');

  const dayIsBetween = day.isBetween(start, end, null, '[]');
  const isFirstDay = day.isSame(start, 'day');
  const isLastDay = day.isSame(end, 'day');
  const isPrepDay = dayIsBetween && day.isBefore(selectedDay, 'day');
  const isTestDay = dayIsBetween && (day.isSame(selectedDay, 'day') || day.isSame(selectedDay.add(1, 'day')));

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
      isprepday={JSON.stringify(isPrepDay)}
      istestday={JSON.stringify(isTestDay)}
    />
  );
}
