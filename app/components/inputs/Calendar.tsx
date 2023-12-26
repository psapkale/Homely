'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type DatePickerProps = {
   value: Range;
   // value: DateRange;
   onChange: (value: RangeKeyDict) => void;
   disabledDates?: Date[];
};

const DatePicker = ({ value, onChange, disabledDates }: DatePickerProps) => {
   return (
      <DateRange
         rangeColors={['#262626']}
         ranges={[value]}
         date={new Date()}
         onChange={onChange}
         direction='vertical'
         showDateDisplay={false}
         minDate={new Date()}
         disabledDates={disabledDates}
      />
   );
};

export default DatePicker;
