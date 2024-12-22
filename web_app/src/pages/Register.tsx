import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Register() {
  const [componentNumber, setComponentNumber] = useState(0);
  const [userDetails, setUserDetails] = useState({
    institute: "",
    rollNumber: "",
    mail: "",
    semester: "",
    course: "",
    department: "",
    name: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const goBack = () => {
    if (componentNumber > 0) {
      setComponentNumber(componentNumber - 1);
    }
  };

  const handleSubmission = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error("Passwords do not match!");
    } else if (userDetails.password.length < 8) {
      toast.error("Password should be atleast 8 characters long");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*(){}?><.,;:]).+$/.test(
        userDetails.password
      )
    ) {
      toast.warn(
        "Password should contain atleast one uppercase, one lowercase, one number and one special character"
      );
    } else {
      setComponentNumber(0);
      toast.success("Successfully joined the community!");
      console.log(userDetails);
    }
  };

  const renderCreateAccount = () => (
    <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-8">
      <div className="text-start">
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="mt-2 text-gray-500">
          Enter your academic details and get started!
        </p>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !/^[A-Za-z]+$/.test(userDetails.rollNumber[0]) ||
            !/^[0-9]+$/.test(
              userDetails.rollNumber[userDetails.rollNumber.length - 1]
            ) ||
            userDetails.rollNumber.length < 6
          ) {
            toast.error(
              "Invalid Roll Number! Should be in the format CSB23023 or csb23078"
            );
          } else if (!userDetails.mail.endsWith("@tezu.ac.in")) {
            toast.error(
              "Invalid Mail! Should be an official mail which ends with @tezu.ac.in"
            );
          } else if (
            userDetails.mail.split("@")[0].toLowerCase() !=
            userDetails.rollNumber.toLowerCase()
          ) {
            toast.error("Mail and Roll Number should match!");
          } else {
            setComponentNumber(1);
          }
        }}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Institute Name"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, institute: e.target.value })
            }
            value={userDetails.institute}
            required
          />
          <input
            type="text"
            placeholder="Roll Number"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, rollNumber: e.target.value })
            }
            value={userDetails.rollNumber}
            required
          />
          <input
            type="email"
            placeholder="Mail (official mail only)"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, mail: e.target.value })
            }
            value={userDetails.mail}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="relative w-full cursor-pointer overflow-hidden rounded-md border-2 border-black bg-[#ACC8F7] px-5 py-3 text-center font-mono font-semibold text-white transition-all duration-300 hover:shadow-lg hover:bg-blue-500 hover:border-black"
          >
            <span className="relative text-black">
              CONTINUE <FaArrowRight className="inline ml-2 text-black" />
            </span>
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/user/login"
            className="font-semibold text-blue-500 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );

  const renderAcademicDetails = () => (
    <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-8">
      <div className="text-start">
        <h1 className="text-3xl font-bold text-gray-800">Academic Details</h1>
        <p className="mt-1 text-gray-400">Here we go!</p>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setComponentNumber(2);
        }}
      >
        <div className="space-y-4">
          <select
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, semester: e.target.value })
            }
            value={userDetails.semester}
            required
          >
            <option value="" disabled>
              Semester
            </option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, course: e.target.value })
            }
            value={userDetails.course}
            required
          >
            <option value="" disabled>
              Course
            </option>
            {[
              "B.Tech",
              "M.Tech",
              "PhD",
              "MSc",
              "MBA",
              "MA",
              "MCA",
              "BSc",
              "BA",
              "Diploma",
            ].map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Department"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, department: e.target.value })
            }
            value={userDetails.department}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="relative w-full cursor-pointer overflow-hidden rounded-md border-2 border-black bg-[#ACC8F7] px-5 py-3 text-center font-mono font-semibold text-white transition-all duration-300 hover:shadow-lg hover:bg-blue-500 hover:border-black"
          >
            <span className="relative text-black">
              CONTINUE <FaArrowRight className="inline ml-2 text-black" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="mx-auto my-5 flex w-full max-w-lg flex-col space-y-8 rounded-lg bg-white p-10">
      <div className="text-start">
        <h1 className="text-2xl font-bold text-gray-800">Personal Details</h1>
        <p className="mt-1 text-gray-500">It's almost done !</p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (userDetails.phone.length !== 10) {
            toast.error("Invalid Phone Number! Should be of 10 digits");
          } else {
            setComponentNumber(3);
          }
        }}
      >
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            value={userDetails.name}
            required
          />
          <input
            type="text"
            placeholder="Username (optional)"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            value={userDetails.username}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
            value={userDetails.phone}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="relative w-full cursor-pointer overflow-hidden rounded-md border-2 border-black bg-[#ACC8F7] px-5 py-3 text-center font-mono font-semibold text-white transition-all duration-300 hover:shadow-lg hover:bg-blue-500 hover:border-black"
          >
            <span className="relative text-black">
              CONTINUE <FaArrowRight className="inline ml-2 text-black" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );

  const renderPasswordPage = () => (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="mx-auto my-5 flex w-full max-w-lg flex-col space-y-8 p-10">
        <div className="text-start">
          <h1 className="text-2xl font-bold text-gray-800">Set a Password</h1>
          <p className="mt-2 text-gray-500">
            Make it long and keep it secret !
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmission}>
          <div className="flex flex-col space-y-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              value={userDetails.password}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  confirmPassword: e.target.value,
                })
              }
              value={userDetails.confirmPassword}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full cursor-pointer overflow-hidden rounded-md border-2 border-black bg-[#ACC8F7] px-5 py-3 text-center font-mono font-semibold text-white transition-all duration-300 hover:shadow-lg hover:bg-blue-500 hover:border-black"
            >
              <span className="relative text-black">JOIN THE COMMUNITY</span>
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={goBack}
        className="group mx-auto mt-3 flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-500"
      >
        <FaArrowLeft className="text-blue-500 group-hover:-translate-x-1 transition" />
        <span>Back</span>
      </button>
    </div>
  );

  return (
    <>
      {componentNumber < 3 ? (
        <div className="grid grid-cols-2 h-screen">
          <div className="flex flex-col justify-center items-center h-full">
            {componentNumber === 0 && renderCreateAccount()}
            {componentNumber === 1 && renderAcademicDetails()}
            {componentNumber === 2 && renderPersonalDetails()}
            {componentNumber > 0 && (
              <button
                onClick={goBack}
                className="group mx-auto my-3 flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-500"
              >
                <FaArrowLeft className="text-blue-500 group-hover:-translate-x-1 transition" />
                <span>Back</span>
              </button>
            )}
          </div>
          <div className="bg-[#E5E5E5] bg-cover bg-center h-full w-full flex justify-evenly">
            {(componentNumber === 0 || componentNumber === 1) && (
              <img
                className="w-[400px] mx-auto my-auto block"
                src="/academic.png"
                alt=""
              />
            )}
            {componentNumber === 2 && (
              <img
                className="w-[400px] mx-auto my-auto block"
                src="/personal.png"
                alt=""
              />
            )}
          </div>
        </div>
      ) : (
        renderPasswordPage()
      )}
    </>
  );
}