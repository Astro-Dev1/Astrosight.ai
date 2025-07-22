import React from 'react';
// import { AlertCircle, Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ComingSoonPage = () => {
  return (
    <div>
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center items-center p-4">
      <Header />
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-5xl font-bold text-orange-600 mb-2">Coming Soon</h1>
        <p className="text-xl text-orange-800 mb-8">We`&lsquo;`re working hard to bring you something amazing. Stay tuned!</p>
        
        <div className="bg-orange-100 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-800 mb-4">Get Notified</h2>
          <p className="text-orange-700 mb-4">Be the first to know when we launch. Sign up for our newsletter!</p>
          
          <form className="space-y-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
              Notify Me
            </Button>
          </form>
        </div>

        {/* <Alert className="mt-8 bg-orange-200 border-orange-400">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800">Stay Connected</AlertTitle>
          <AlertDescription className="text-orange-700">
            Follow us on social media for updates and sneak peeks!
          </AlertDescription>
        </Alert> */}

        <footer className="mt-8 text-orange-700">
          <p>&copy; 2024 AstroAnswer. All rights reserved.</p>
        </footer>
      </div>
      
    </div>
    
    </div>
  );
};

export default ComingSoonPage;