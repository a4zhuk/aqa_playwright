import { IRegistrationData } from "../../types/demo_login_form/negative_types";

const registrationInvalodData: IRegistrationData[] = [
  {
    testName: "Checke registration with empty username",
    username: "",
    password: "TestPassword123",
    message: "Username is required",
  },
  {
    testName: "Check registration with short username( username < 3)",
    username: "ab",
    password: "TestPassword123",
    message: "Username should contain at least 3 characters",
  },
  {
    testName: "Check registration with long username (username > 40)",
    username: "TestLoongUserNameWithFortyOneSybmolinText",
    password: "TestPassword123",
    message: "Username can't exceed 40 characters",
  },
  {
    testName: "Check registration with sapces at the beginning of the username",
    username: " testusername",
    password: "TestPassword123",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Check registration with spaces at the end of the username",
    username: "testuser ",
    password: "TestPassword123",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Check registration using username that contains only spaces",
    username: "        ",
    password: "TestPassword123",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Check registration using empty passord",
    username: "TestUsername",
    password: "",
    message: "Password is required",
  },
  {
    testName: "Check registration with short password (password < 8)",
    username: "TestUsername",
    password: "Test123",
    message: "Password should contain at least 8 characters",
  },
  {
    testName: "Check registration with long password (password > 20)",
    username: "TestUsername",
    password: "TestPassword123456789",
    message: "Password can't exceed 20 characters",
  },
  {
    testName:
      "Check registration using password that contains only lower case character",
    username: "TestUsername",
    password: "testpasword",
    message: "Password should contain at least one character in upper case",
  },
  {
    testName:
      "Check registration using password that contains only uppercase charactest",
    username: "TestUsername",
    password: "TESTPASSWORD",
    message:
      "Password should contain at least one character in lower case and one number",
  },
  {
    testName: "Check registration using pasword that contains only numbers",
    username: "TestUsername",
    password: "12345678",
    message:
      "Password should contain at least one character in lower and upper case",
  },
  {
    testName: "Check registration using password that contains only spaces",
    username: "TestUsername",
    password: "         ",
    message: "Password is required",
  },
];

export { registrationInvalodData };
