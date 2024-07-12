const { sequelize, PlantAnalysis, User } = require('./models');

// Test de connexion à la base de données et d'insertion
async function testInsert() {
  try {
    // Synchronisation avec la base de données
    await sequelize.sync({ force: true });

    // Créer un utilisateur de test
    const user = await User.create({
      username: 'testuser',
      password_hash: 'testpasswordhash',
      email: 'testuser@example.com'
    });

    // Insérer une analyse de plante de test
    const analysis = await PlantAnalysis.create({
      user_id: user.id,
      plant_type: 'Test Plant',
      condition: 'Test Condition',
      image_url: 'path/to/test/image.jpg',
      treatment_validated: false
    });

    console.log('Insertion réussie :', analysis);
  } catch (error) {
    console.error('Erreur lors de l\'insertion :', error);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
  }
}

testInsert();