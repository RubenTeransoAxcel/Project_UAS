export default function Forgot() {
  return (
      <div>
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">
              Forgot Your Password?
          </h2>
          
          <p className="text-sm text-white mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
          </p>

          <form>
              <div className="mb-5">
                  <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white mb-1"
                  >
                      Email Address
                  </label>
                  <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                          placeholder-gray-400"
                      placeholder="you@example.com"
                  />
              </div>
              <button
                  type="submit"
                  className="w-full bg-biru hover:bg-blue-900 text-white font-semibold py-2 px-4
                      rounded-lg transition duration-300"
              >
                  Send Reset Link
              </button>
          </form>
      </div>
  )
}
