'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LuCalendarDays } from 'react-icons/lu';

interface DatePickerDemoProps {
  value?: Dayjs | string | null;
  onChange?: (_: Dayjs | undefined) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  bordered?: boolean;
  disableFuture?: boolean;
  calendarClassName?: string;
}

export function DatePicker({
  value,
  onChange,
  className,
  placeholder = 'Pick a date',
  disabled = false,
  bordered = false,
  disableFuture = false,
  calendarClassName,
}: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Dayjs | undefined>(
    value ? dayjs(value) : undefined,
  );
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (newDate: Date | undefined) => {
    const dayjsDate = newDate ? dayjs(newDate) : undefined;
    setDate(dayjsDate);
    onChange?.(dayjsDate);
    setOpen(false);
  };

  React.useEffect(() => {
    if (value) {
      setDate(dayjs(value));
    } else {
      setDate(undefined);
    }
  }, [value]);

  const isDateDisabled = (date: Date) => {
    if (disableFuture) {
      return dayjs(date).isAfter(dayjs(), 'day');
    }
    return false;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={bordered ? 'bordered' : 'plain'}
          className={cn(
            `min-h-10 w-full justify-start bg-background-foreground text-left text-sm font-normal text-gray`,
            !date && 'text-muted-foreground',

            className,
          )}
          disabled={disabled}
        >
          <LuCalendarDays className="mr-1 h-[14px] w-[14px] text-gray" />
          {date ? (
            date.format('MMM D, YYYY')
          ) : (
            <span className="text-gray">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-auto border-none bg-background p-0 ${calendarClassName}`}
        align="start"
      >
        <Calendar
          mode="single"
          selected={date?.toDate()}
          onSelect={handleDateSelect}
          initialFocus
          disabled={(date) => disabled || isDateDisabled(date)}
        />
      </PopoverContent>
    </Popover>
  );
}
