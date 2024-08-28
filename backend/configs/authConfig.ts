export const authConfig = {
    secret: process.env.JWT_SECRET || 'your_secret_key',
    expiresIn: '1d', // Duração do token
  };