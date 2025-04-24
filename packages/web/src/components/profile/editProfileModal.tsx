"use client"

import { useState } from "react"
import { Twitter, Send } from "lucide-react"

export default function EditProfileModal() {
  const [isOpen, setIsOpen] = useState(true)
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [twitterConnected, setTwitterConnected] = useState(true)
  const [telegramConnected, setTelegramConnected] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const toggleTwitterConnection = () => {
    setTwitterConnected(!twitterConnected)
  }

  const toggleTelegramConnection = () => {
    setTelegramConnected(!telegramConnected)
  }

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Saving changes:", { username, description })
    setIsOpen(false)
  }

  if (!isOpen) return null
// 648
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-full max-w-[648px] bg-[#001413] text-white shadow-xl overflow-hidden border-2 border-[#314140] rounded-[16px]">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">Edit Profile</h2>
            <button
              onClick={handleClose}
              className="bg-[#2a3038] hover:bg-[#3a404a] transition-colors rounded-full px-4 py-1.5 text-sm"
            >
              Close
            </button>
          </div>

          <div className="h-px bg-[#1a1e24] w-full my-4"></div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg">About</h3>
            <div className="text-[#6c7983] text-sm">0x23ae67e6611adcff3414faadc1</div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Add username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border border-[#2a3038] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#3a8f8f]"
              />

              <input
                type="text"
                placeholder="Add description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-transparent border border-[#2a3038] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#3a8f8f]"
              />
            </div>
          </div>

          {/* Email Notification */}
          <div className="space-y-2">
            <h3 className="text-lg">Email Notification</h3>
            <div className="text-[#6c7983] text-sm">Email12@gmail.com</div>
          </div>

          {/* Social Connections */}
          <div className="space-y-4">
            <h3 className="text-lg">About</h3>

            <div className="flex items-center justify-between border border-[#2a3038] rounded-full px-5 py-3">
              <div className="flex items-center space-x-3">
                <div className="bg-black rounded-full p-1.5">
                  <Twitter size={18} className="text-white" />
                </div>
                <span className="text-sm text-[#6c7983]">https://twitter.com/username</span>
              </div>
              <button
                onClick={toggleTwitterConnection}
                className="bg-[#2a3038] hover:bg-[#3a404a] transition-colors rounded-full px-4 py-1.5 text-sm"
              >
                Disconnect
              </button>
            </div>

            <div className="flex items-center justify-between border border-[#2a3038] rounded-full px-5 py-3">
              <div className="flex items-center space-x-3">
                <div className="bg-[#229ED9] rounded-full p-1.5">
                  <Send size={18} className="text-white" />
                </div>
                <span className="text-sm">Telegram</span>
              </div>
              <button
                onClick={toggleTelegramConnection}
                className="bg-[#2a3038] hover:bg-[#3a404a] transition-colors rounded-full px-4 py-1.5 text-sm"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleSaveChanges}
              className="bg-[#00BFA5] hover:bg-[#00a58c] transition-colors text-white rounded-full px-8 py-3 font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
