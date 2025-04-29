import { FundingOption } from '@/lib/types';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ChevronRight } from 'lucide-react';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: FundingOption[];
  onSelect?: (option: FundingOption) => void;
}

export default function ChooseFundingMethodModal({
  isOpen,
  setIsOpen,
  options,
  onSelect,
}: Props) {
  const handleSelect = (option: FundingOption) => {
    if (onSelect) onSelect(option);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full !max-w-[557px]">
        <DialogHeader>
          <DialogTitle className="font-normal md:text-2xl text-xl lg:text-[28px]">
            <span className='text-[#1E1E1E] dark:text-[#F4F6FA]'>Fund your account</span>
            <p className='text-[#1E1E1E] dark:text-[#9DA3AC] text-base mt-2'>How would you love to fund your global wallet</p>
          </DialogTitle>
          <DialogDescription>
            <div className="grid gap-4 mt-6">
              {options.map((option, index) => (
                <FundingOptionElement
                  key={index} {...option}
                  onClick={() => handleSelect(option)}
                />
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const FundingOptionElement = ({
  icon, title, description, onClick
}: FundingOption & {onClick: () => void} ) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="flex items-center justify-between !bg-transparent rounded-full
      p-3.5 h-auto border border-[#D9D9D9] dark:border-[#314140]
      cursor-pointer hover:!bg-[#D9D9D9]/5 hover:dark:bg-[#314140]/5 transition-colors duration-200 ease-in-out"
    >
      <div className='flex items-center gap-2.5'>
        <div
          className='flex items-center justify-center w-11 h-11 rounded-full
          bg-[#2C2C2C] text-white overflow-hidden'>
          {typeof icon === 'string' ? (
            <img src={icon} alt={title} className="object-cover" />
          ) : icon() }
        </div>
        <div className='flex flex-col items-start gap-0.5 text-base leading-tight'>
          <h4 className='text-[#1E1E1E] dark:text-[#F4F6FA]'>{title}</h4>
          {!!description && <p className="text-[#9DA3AC]">{description}</p>}
        </div>
      </div>
      
      <ChevronRight className="text-2xl text-[#141B34] dark:text-[#F4F6FA]" />
    </Button>
  )
}