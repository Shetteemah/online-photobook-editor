import { useState } from 'react';

export default function PersonalDataPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="space-y-4">
        {/* Change Password Section */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left font-bold text-lg"
            onClick={() => toggleSection('password')}
          >
            Change Password
            <span>{expandedSection === 'password' ? '-' : '+'}</span>
          </button>
          {expandedSection === 'password' && (
            <div className="mt-4">
              <form>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Current Password</label>
                  <input type="password" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">New Password</label>
                  <input type="password" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Confirm New Password</label>
                  <input type="password" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md">Save</button>
              </form>
            </div>
          )}
        </div>

        {/* Address/Profile Section */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left font-bold text-lg"
            onClick={() => toggleSection('address')}
          >
            My address/profile
            <span>{expandedSection === 'address' ? '-' : '+'}</span>
          </button>
          {expandedSection === 'address' && (
            <div className="mt-4">
              <form>
                {/* Add the form fields for the address/profile section here */}
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">First Name</label>
                  <input type="text" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Last Name</label>
                  <input type="text" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                {/* Add the rest of the address fields */}
                <button className="bg-red-600 text-white px-4 py-2 rounded-md">Save</button>
              </form>
            </div>
          )}
        </div>

        {/* Change Login Email Section */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left font-bold text-lg"
            onClick={() => toggleSection('email')}
          >
            Change login email
            <span>{expandedSection === 'email' ? '-' : '+'}</span>
          </button>
          {expandedSection === 'email' && (
            <div className="mt-4">
              <form>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">New Email Address</label>
                  <input type="email" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Confirm Email Address</label>
                  <input type="email" className="border border-gray-300 rounded-md p-2 w-full" />
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md">Save</button>
              </form>
            </div>
          )}
        </div>

        {/* Delete Payment Data Section */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left font-bold text-lg"
            onClick={() => toggleSection('payment')}
          >
            Delete payment data
            <span>{expandedSection === 'payment' ? '-' : '+'}</span>
          </button>
          {expandedSection === 'payment' && (
            <div className="mt-4">
              <p className="text-gray-600">
                Deleting stored bank and credit card information.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md mt-4">Delete Payment Data</button>
            </div>
          )}
        </div>

        {/* Delete User Account Section */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left font-bold text-lg"
            onClick={() => toggleSection('account')}
          >
            Delete user account
            <span>{expandedSection === 'account' ? '-' : '+'}</span>
          </button>
          {expandedSection === 'account' && (
            <div className="mt-4">
              <p className="text-gray-600">
                Remove user account and all data. This action is irreversible.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md mt-4">Delete User Account</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
