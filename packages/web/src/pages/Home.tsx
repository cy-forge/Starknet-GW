
"use client"

import { Account } from "@/components/dashboard/account";
import { BronzeTier } from "@/components/dashboard/BronzeTier";
import SuperDuper from "@/components/dashboard/SuperDuper";
import { FundingWarning } from "@/components/dashboard/funding";
import { XpWeeklyRecap } from '@/components/dashboard/XpWeeklyRecap';
import { useState } from "react"
import EditProfileModal from "@/components/profile/editProfileModal"
import { Button } from "@/components/ui/button"
import { Switch } from '@/components/ui/switch';
import { setupThemeToggle } from '@/lib/themeToggle';
import { Link } from 'react-router';
import BadgeDetails from '@/components/badge/badgeModal';


const { toggleTheme, isDarkMode } = setupThemeToggle();

const HomePage = () => {
    const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Switch defaultChecked={isDarkMode} onClick={toggleTheme} />
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-lg">This is a dummy home page of This application.</p>
      <p className="text-lg">Below are link to pages on the application.</p>
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            to="/dashboard"
            className="text-primary-bluegreen hover:underline"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/discover"
            className="text-primary-bluegreen hover:underline"
          >
            Discover
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/trade"
            className="text-primary-bluegreen hover:underline"
          >
            Trade
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/trade/event"
            className="text-primary-bluegreen hover:underline"
          >
            Trade Event
          </Link>
        </li>
        <li>
          <div className="text-primary-bluegreen hover:underline flex items-center">
            Account Modal <Account />
           
          </div>
        </li>
        <li>
          <div className="text-primary-bluegreen hover:underline flex items-center">
           Badge Modal <BadgeDetails />
           
          </div>
        </li>
       
      </ul>
      <div>
        <BronzeTier
          address="0x1234567890123456789012345678901234567890"
          tier="Bronze"
          xp={200}
          maxXp={1000}
          timeLeft={{ hours: 132, minutes: 48, seconds: 3 }}
        />
      </div>

      <Button onClick={openModal}>Open Edit Profile</Button>
      <EditProfileModal isOpen={showModal} onClose={closeModal} />



      <SuperDuper />


      <div >
        <XpWeeklyRecap/>
      </div>


      
      <div className="my-8">
        <FundingWarning
          title="This wallet can only be used within the abstract network"
          desc="Do not send funds to this address on another chain, or they will be lost"
        />
      </div>



    </div>
  );
};


