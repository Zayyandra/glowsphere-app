export default function Register() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Create Your Account ✨
        </h2>
  
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="you@example.com"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="********"
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="********"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
  