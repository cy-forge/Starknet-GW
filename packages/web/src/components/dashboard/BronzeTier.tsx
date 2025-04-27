'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CustomProgress } from '@/components/ui/custom-progress';
import { addCommasToNumber, formatAddress } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import IconPlaceholder from '../shared/IconPlaceholder';

interface BronzeTierProps {
  address: string;
  tier: string;
  xp: number;
  maxXp: number;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export function BronzeTier({
  address,
  tier,
  xp,
  maxXp,
  timeLeft,
}: BronzeTierProps) {
  const progress = (xp / maxXp) * 100;
  const formattedAddress = formatAddress(address);

  return (
    <Card className="w-full max-w-[436px] border-[#EDEFF3] bg-white dark:bg-[#0A1D1C] dark:border-[#314140] p-6 space-y-4">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-2 w-full">
        <div className="flex flex-col items-center space-y-2">
          <IconPlaceholder className="w-[5.5rem] h-[5.5rem]" />
          <Button
            variant="secondary"
            className="bg-transparent text-[#9596A0] hover:bg-[#314140]"
          >
            <span className="text-sm max-w-[6.25rem]">{formattedAddress}</span>
            <CopyIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <h2 className="text-2xl font-medium text-[#1E1E1E] dark:text-[#F4F6FA]">
          {tier}
        </h2>
        <Button className="bg-[#2D2D2D] font-bold dark:bg-[#0EB094] text-white hover:bg-[#0EB094]/90">
          Connect X to get XP Boost!
        </Button>
      </div>

      {/* XP Section */}
      <div className="flex flex-col space-y-3 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-[#1E1E1E] dark:text-[#F4F6FA]">XP</span>
            <Button
              variant="outline"
              className="bg-[#D9D9D9] dark:bg-[#314140] text-[#1E1E1E] dark:text-[#F4F6FA] border-none hover:bg-[#D9D9D9]/80 dark:hover:bg-[#314140]/80"
            >
              What is this?
            </Button>
          </div>
          <span className="text-[#1E1E1E] dark:text-[#F4F6FA]">
            {xp}/{addCommasToNumber(maxXp)}
          </span>
        </div>
        <CustomProgress
          value={progress}
          maxValue={maxXp}
          className="h-6"
          thumbClassName="w-4 h-4"
        />
      </div>

      {/* Time Section */}
      <div className="flex justify-between items-center p-3 bg-[#F4F6FA] dark:bg-[#0A1D1C] border border-[#EDEFF3] dark:border-[#314140] rounded-md">
        <span className="text-[#1E1E1E] dark:text-[#F4F6FA]">
          Next XP Update in
        </span>
        <div className="flex space-x-1">
          <div className="p-2 border bg-white border-[#D9D9D9] dark:bg-[#314140] rounded-md text-[#1E1E1E] dark:text-[#F4F6FA] text-sm">
            {timeLeft.hours}h
          </div>
          <div className="p-2 border bg-white border-[#D9D9D9] dark:bg-[#314140] rounded-md text-[#1E1E1E] dark:text-[#F4F6FA] text-sm">
            {timeLeft.minutes}m
          </div>
          <div className="p-2 border bg-white border-[#D9D9D9] dark:bg-[#314140] rounded-md text-[#1E1E1E] dark:text-[#F4F6FA] text-sm">
            {timeLeft.seconds}s
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex items-center p-3 bg-[#F4F6FA] dark:bg-[#0A1D1C] border border-[#EDEFF3] dark:border-[#314140] rounded-md space-x-6">
        <IconPlaceholder className="w-[4.375rem] h-[4.375rem]" />
        <p className="text-[#1E1E1E] dark:text-[#F4F6FA] text-sm">
          Earn XP throughout the week by using the global features
        </p>
      </div>
    </Card>
  );
}
