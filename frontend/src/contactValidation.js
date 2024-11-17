export const validate = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  companyName,
  jobTitle,
}) => {
  let validateErrors = {};

  // Check if firstName is empty
  if (!firstName.trim()) {
    validateErrors.firstName = "First name is required";
  }

  // Check if lastName is empty
  if (!lastName.trim()) {
    validateErrors.lastName = "Last name is required";
  }

  // Check if email is empty or invalid
  if (!email.trim()) {
    validateErrors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    validateErrors.email = "Invalid email address";
  }

  // Check if phoneNumber is empty or not a valid 10-digit number
  if (!phoneNumber.trim()) {
    validateErrors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10}$/.test(phoneNumber)) {
    validateErrors.phoneNumber = "Phone number must be 10 digits";
  }

  // Check if companyName is empty
  if (!companyName.trim()) {
    validateErrors.companyName = "Company name is required";
  }

  // Check if jobTitle is empty
  if (!jobTitle.trim()) {
    validateErrors.jobTitle = "Job title is required";
  }

  return validateErrors;
};
