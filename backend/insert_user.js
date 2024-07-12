const { User } = require('./models');

async function createUser() {
  try {
    const user = await User.create({
      username: 'testuser',
      password_hash: 'testpasswordhash',
      email: 'testuser@example.com'
    });
    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();