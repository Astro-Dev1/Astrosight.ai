import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';

const AccountDeletionPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="p-2 text-gray-600 hover:text-[#FF9D42]"
        >
          <i className="fas fa-arrow-left text-xl" />
        </Button>
        <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Account Deletion</h1>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-slash text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Account</h2>
        </div>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <p className="text-gray-700 mb-4">
                Sorry to see you leave, we understand and respect your decision.
              </p>
              <p className="text-gray-700 mb-6">
                Please share your phone number we will delete your account in next 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="Enter your registered phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9+]/g, ''))}
                  className="h-12 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600"
                disabled={!phoneNumber.trim()}
              >
                Submit Deletion Request
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                <i className="fas fa-info-circle mr-2" />
                What happens next?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your account will be deleted within 24 hours</li>
                <li>• All your personal data will be permanently removed</li>
                <li>• This action cannot be undone</li>
                <li>• You ll need to create a new account to use our services again</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-green-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Request Submitted</h3>
            <p className="text-gray-700 mb-6">
              Thank you for submitting your deletion request. Your account associated with{' '}
              <strong>{phoneNumber}</strong> will be deleted within 24 hours.
            </p>
            <Button
              onClick={() => router.push('/')}
              className="w-full h-12 rounded-lg font-semibold text-white bg-[#FF9933] hover:bg-[#FF9933]/90"
            >
              Return to Home
            </Button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-[#FFF6E9] p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              <i className="fas fa-envelope mr-2 text-[#FF9D42]" />
              Need Help?
            </h4>
            <p className="text-sm text-gray-700">
              For any other concerns, mail us on{' '}
              <a 
                href="mailto:admin@astrosight.ai" 
                className="text-[#FF9D42] font-medium hover:underline"
              >
                admin@astrosight.ai
              </a>
            </p>
          </div>
        </div>

        {!isSubmitted && (
          <div className="mt-4 text-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDeletionPage;