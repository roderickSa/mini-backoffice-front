"use client";

import loginAction from "../_api/loginAction";
import { useFormState, useFormStatus } from "react-dom";
import { ErrorResponse } from "../_types";

const initialState: ErrorResponse = {
  data: {
    errors: [{ message: "" }],
  },
};

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
        <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-lg font-semibold">My Account</h3>
            <div>
              <label className="block py-1">Your email</label>
              <input
                type="email"
                name="email"
                className="border w-full py-2 px-2 rounded shadow ring-1 ring-inset"
              />
            </div>
            <div>
              <label className="block py-1">Password</label>
              <input
                type="password"
                name="password"
                className="border w-full py-2 px-2 rounded shadow ring-1 ring-inset"
              />
            </div>
            <p
              className={`text-sm mt-2 px-2 text-red-600 ${
                state?.data?.errors ? "" : "hidden"
              }`}
            >
              {state?.data?.errors[0].message}
            </p>
            <div className="flex gap-3 pt-3 items-center justify-center">
              <SubmitButton />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
      disabled={pending}
    >
      {pending ? "Loading..." : "Login"}
    </button>
  );
};
