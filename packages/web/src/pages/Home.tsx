"use client"

import { useState } from "react"
import EditProfileModal from "@/components/profile/editProfileModal"
import { Button } from "@/components/ui/button"

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)

  return <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi obcaecati similique corporis illum, fugiat libero assumenda sapiente. Ipsum nulla reiciendis officiis dolorem dicta nisi quam magni, consequuntur animi similique necessitatibus exercitationem cumque dignissimos nemo dolor repudiandae! Minima, vel? Totam, reiciendis.
    <Button onClick={() => setShowModal(true)}>Open Edit Profile</Button>

    {showModal && <EditProfileModal />}
  </main>;
};

export default HomePage;
