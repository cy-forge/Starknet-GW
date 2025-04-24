"use client"

import { useState } from "react"
import EditProfileModal from "@/components/profile/editProfileModal"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestias, aspernatur earum repellat repellendus ex exercitationem nemo tempora magnam non.
      <Button onClick={openModal}>Open Edit Profile</Button>

      <EditProfileModal isOpen={showModal} onClose={closeModal} />
    </main>
  )
}
