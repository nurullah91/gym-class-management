/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorDetails, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorDetails: TErrorDetails = [
    {
      field: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid Request",
    errorDetails,
  };
};

export default handleDuplicateError;
