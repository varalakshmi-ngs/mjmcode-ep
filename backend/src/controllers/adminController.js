const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '24h', // Token expires in 24 hours
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      username,
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  login,
};
