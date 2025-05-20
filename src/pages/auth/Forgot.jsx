export default function Forgot() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3 text-center">
          Forgot Your Password?
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter your email and we'll send you a reset link.
        </p>
  
        <form>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="you@example.com"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    );
  }
  