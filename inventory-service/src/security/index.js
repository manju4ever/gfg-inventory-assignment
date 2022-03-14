export const validateCookie = (request, h) => {
  return {
    valid: true,
    credentials: {
      username: "test",
    },
  };
};

export const validateTokenJWT = async (decoded, request, h) => {
  return { isValid: true };
};

export default {
  validateCookie,
  validateTokenJWT,
};
