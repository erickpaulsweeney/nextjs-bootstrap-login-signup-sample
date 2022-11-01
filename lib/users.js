const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let users = require("../data/users.json");

export function findUser(username) {
  return users.find((user) => user.username === username);
}

export function isUserExists(username) {
  return findUser(username) || false;
}

export function login(username, password) {
  if (!username || !password) {
    return {
      error: "WRONG_CREDENTIAL",
      message: `Username and password required.`,
    };
  }

  if (!isUserExists(username)) {
    return {
      error: "USER_NOT_FOUND",
      message: `${username} not found in user registry. Please sign up first.`,
    };
  }

  const user = findUser(username);
  // console.log(user)
  const hashedPassword = hashPassword(password);
  // console.log(bcrypt.compareSync(password, user.password));

  if (!checkPassword(password, user.password)) {
    return {
      error: "WRONG_CREDENTIAL",
      message: "Incorrect password.",
    };
  }

  const token = jwt.sign(
    { username: user.username, email: user.email, id: user.id },
    jwtSecretKey,
    {
      expiresIn: 3000, // 50min
    }
  );

  return {
    payload: {
      token,
    },
  };
}

export function register({ username, password, email }) {
  if (!username || !password || !email) {
    return errorMessage(
      "WRONG_CREDENTIAL",
      `Username, password, and email required.`
    );
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return errorMessage("WRONG_CREDENTIAL", `Invalid email.`);
  }

  if (isUserExists(username)) {
    return errorMessage(
      "DUPLICATE_USER",
      `${username} already in use as username.`
    );
  }

  const hashedPassword = hashPassword(password);
  const lastUser = users[users.length - 1];
  // console.log(lastUser);
  const id = lastUser ? lastUser.id + 1 : 0;
  // console.log("users:before", users.length);
  users = users.concat([
    {
      username,
      password: hashedPassword,
      email,
      id,
    },
  ]);
  // console.log("users:after", users.length);
  // console.log("users", JSON.stringify(users, null, 2));

  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));

  return {
    isSuccessful: true,
    payload: {},
  };
}

export function whoAmI(username) {
  if (!username || !isUserExists(username)) {
    return {
      error: "USER_NOT_FOUND",
      message: `${username} is not defined, make sure the user is registered before.`,
    };
  }

  const user = findUser(username);
  return {
    isSuccessful: true,
    payload: {
      username: user.username,
      id: user.id,
      email: user.email,
    },
  };
}

function hashPassword(password) {
  return bcrypt.hashSync(password, salt);
}

function checkPassword(currentHashedPassword, hashedPassword) {
  return bcrypt.compareSync(currentHashedPassword, hashedPassword);
}

export function verifyToken(token) {
  return jwt.verify(token, jwtSecretKey);
}

function errorMessage(error, message) {
  return {
    isSuccessful: false,
    error,
    message,
  };
}
