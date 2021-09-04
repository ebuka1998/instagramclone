import React from "react";
import Spinner from "../spinner/Spinner";

const SubmitButton = ({text, register, loading, disabled}) => {
  return (
    <button
      type="submit"
      className={
        disabled
          ? "w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1 opacity-50 cursor-not-allowed"
          : "w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
      }
      onClick={register}
      disabled={disabled}
    >
      {loading ? (
        <div className="flex justify-center">
          <Spinner classname="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
//opacity-50 cursor-not-allowed
