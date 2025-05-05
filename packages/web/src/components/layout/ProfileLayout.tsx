import { SidebarProvider } from "../ui/sidebar";
import { Button } from "../ui/button";
import EditProfileModal from "../profile/editProfileModal";
import { useState } from "react";

const ProfileLayout = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  return (
    <SidebarProvider>
      <div className="h-screen bg-primary p-4 md:p-10 lg:p-[3.125rem] flex w-full">
        <Button onClick={openModal}>Open Edit Profile</Button>
        <EditProfileModal isOpen={showModal} onClose={closeModal} />
      </div>
    </SidebarProvider>
  );
};

export default ProfileLayout;
