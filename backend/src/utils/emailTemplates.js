export const loginOtpTemplate = (otp) => `
  <h2>Login OTP</h2>
  <p>Your OTP to login is:</p>
  <h1>${otp}</h1>
  <p>This OTP expires in 5 minutes.</p>
`;

export const signupOtpTemplate = (otp) => `
  <h2>Signup OTP</h2>
  <p>Your OTP to create your Cartivo account is:</p>
  <h1>${otp}</h1>
  <p>This OTP expires in 5 minutes.</p>
`;
