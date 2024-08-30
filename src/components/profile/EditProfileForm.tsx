import { forwardRef } from 'react';
import AvatarUpload from './AvatarUpload';
import { IEditProfileForm } from '@/interfaces/EditProfileInterface';

const EditProfileForm = forwardRef<HTMLInputElement, IEditProfileForm> (
  (
    {
      handleChangeName,
      handleChangeEmail,
      avatar,
      handleAvatarChange,
      name,
      email,
      setName,
      setEmail
    },
    ref
  ) => {
    return (
      <>
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">Edit Profile</h1>
          <div className="flex flex-col items-center mb-8">
            <AvatarUpload
              avatar={avatar}
              onAvatarChange={handleAvatarChange}
              ref={ref}
              width={80}
              height={80}
              fontSize={50}
            />
          </div>
          <form onSubmit={handleChangeName} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6">
            <div className="flex flex-col space-y-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-opacity-50"
              >
                Save Name
              </button>
            </div>
          </form>
          <form onSubmit={handleChangeEmail} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex flex-col space-y-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-opacity-50"
              >
                Save Email
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
);

export default EditProfileForm;





