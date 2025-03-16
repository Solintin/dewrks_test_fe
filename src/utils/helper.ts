import { toast } from "react-toastify";
// import { AxiosError } from "axios";

export function generateRandomID(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function errorLogger(error: any) {
  if (error.response?.status === 401) {
    toast.error("Token  expired, login required");
    window.open("/auth/signin");
    return;
  }
  if (
    typeof error?.response?.data?.error === "object" &&
    !Array.isArray(error?.response?.data?.error)
  ) {
    toast.error(error?.response?.data?.message);
  }
  // Check if the response is an array
  else if (Array.isArray(error?.response?.data?.error)) {
    (error?.response?.data?.error ?? []).map((e: string) =>
      toast.error(e ?? "An error occurred, Please try again"),
    );
  } else {
    // toast.error(
    //   error?.response?.data?.message ?? "An error occurred, Please try again",
    //
    // );
  }
}

export const getEmptyKeys = (obj: any, excludeKeys: string[] = []) => {
  return Object.keys(obj).filter((key) => {
    // Skip validation if the key is in the excludeKeys array
    if (excludeKeys.includes(key)) {
      return false;
    }

    const val = obj[key];
    if (val === undefined || val === null || val === "") {
      toast.error(`${key} cannot be empty`);
    }

    return val === undefined || val === null || val === "";
  });
};
export function convertCurrencyStringToNumber(currencyString: string) {
  // Remove the currency symbol and replace commas with nothing
  const cleanedString = currencyString.replace("₦", "").replace(/,/g, "");
  // Convert the cleaned string to a number
  const number = parseFloat(cleanedString);
  return number;
}

export function amountFormatter(value: string | number = 0) {
  let amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  return {
    value,
    format: amount.format(+value),
  };
}

export function base64ToFile(base64: string, filename: string) {
  if (base64) {
    console.log(base64);

    // Extract the base64 part (remove metadata)
    const base64Data = base64.split(",")[1];

    // Decode the base64 string into binary data
    const binaryData = atob(base64Data);

    // Convert binary data to a Uint8Array
    const arrayBuffer = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      arrayBuffer[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

    // Create a File from the Blob
    return new File([blob], filename, { type: "image/jpeg" });
  }
}

/**
 * Determines if a person is over 18 years old based on their birthdate
 *
 * @param {string} birthdate - Birthdate in the format 'YYYY-MM-DD'
 * @returns {boolean} - True if the person is 18 or older, false otherwise
 */
export function isOver18(birthdate: string) {
  // Validate the input format using a regular expression
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(birthdate)) {
    console.log("Invalid date format. Please use YYYY-MM-DD");
  }

  // Create Date objects for the birthdate and current date
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  // Calculate the age by finding the difference in years
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't occurred this year
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  const dayDifference = currentDate.getDate() - birthDate.getDate();

  // If the birthday hasn't occurred this year, subtract a year from the age
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  // Return true if age is 18 or older
  return age >= 18;
}
