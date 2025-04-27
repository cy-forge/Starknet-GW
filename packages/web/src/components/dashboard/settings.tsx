import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export function SettingsModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const handleEnable = (itemId: string) => {
    // Handle the enable action for the specific item
    console.log(`Enable ${itemId}`);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full !max-w-[557px]">
        <DialogHeader>
          <DialogTitle className="font-normal md:text-2xl text-xl  lg:text-[28px] ">
            Security Settings
          </DialogTitle>
          <hr className="my-4 border-t dark:border-[#314140] border-[#D9D9D9]" />
          <DialogDescription>
            {securityContent.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-start gap-2 mb-4 border dark:border-[#314140] border-[#EDEFF3] bg-[#F7F9FF] dark:bg-[#0A1D1C] p-3 rounded-xl"
              >
                <div className="w-full gap-0.5 flex flex-col">
                  <p className="text-lg font-normal capitalize dark:text-[#F4F6FA] text-[#2D2D2D] ">
                    {item.title}
                  </p>
                  <p className="text-[#9DA3AC] capitalize font-Sansation font-normal text-sm">
                    {item.description}
                  </p>
                </div>
                <Button
                  variant={'ghost'}
                  onClick={() => handleEnable(item.id)}
                  className="w-max px-[16px] py-[10px] text-sm lg:text-base  bg-[#D9D9D9] dark:bg-[#314140] dark:text-[#F4F6FA] text-[#1E1E1E]  rounded-[48px] opacity-70 transition-opacity hover:opacity-100 focus:ring-0 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
                >
                  <span>Enable</span>
                </Button>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const securityContent = [
  {
    title: 'Passkey login',
    description: 'Password-free login using your device’s built-in security',
    id: 'passkey-login',
  },
  {
    title: '2FA with an authenticator app (Recommended)',
    description:
      'Secure your account with verification codes from an authenticator app',
    id: '2fa-authenticator-app',
  },
  {
    title: '2FA with a passkey',
    description:
      'Secure your account with a passkey using a fingerprint, face recognition, or a security key. this can be used as an additional authentication method in addition to your authenticator app.',
    id: '2fa-passkey',
  },
];
