'use client';

import { cn } from '@/lib/utils';

interface CustomProgressProps {
  value: number;
  className?: string;
  maxValue: number;
  thumbClassName?: string;
}

export function CustomProgress({
  value,
  maxValue,
  className,
  thumbClassName,
}: CustomProgressProps) {
  const progress = Math.min(Math.max(value, 0), maxValue);
  const thumbPosition = `${progress}%`;

  return (
    <div
      className={cn(
        'relative h-2 w-full bg-[#D9D9D9] dark:bg-[#0A1D1C] border dark:border-[#314140] rounded-full overflow-hidden',
        className
      )}
    >
      {/* Progress track */}
      <div
        className="absolute h-full rounded-l-full bg-[#0EB094] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />

      {/* Circular thumb */}
      <div
        className={cn(
          'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white dark:bg-[#314140] shadow-sm transition-all duration-300',
          thumbClassName
        )}
        style={{ left: `calc(${value > 8 ? thumbPosition : '10px'} - 8px)` }}
      />
    </div>
  );
}
