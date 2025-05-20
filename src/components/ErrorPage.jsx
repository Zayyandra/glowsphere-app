import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ code = 'Error', title = 'Something went wrong', message = 'An unexpected error has occurred.' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-700 text-white px-4">
      {/* Text Section */}
      <div className="text-center md:text-left md:w-1/2 max-w-md">
        <h1 className="text-6xl font-bold mb-4">{code}</h1>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={() => navigate('/')}
          className="inline-block px-6 py-3 border border-white rounded-full text-white hover:bg-white hover:text-blue-700 transition"
        >
          ← Back To Home
        </button>
      </div>

      {/* Animation Section */}
      <div className="mt-10 md:mt-0 md:w-1/2">
        <iframe
          src="https://embed.lottiefiles.com/animation/106540"
          className="w-full h-80 md:h-[400px] border-0"
          title="Error Animation"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ErrorPage;
