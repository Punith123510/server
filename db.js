const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://punithbh:LX0WtqaVGFVBrD0F@cluster0.2ysulg2.mongodb.net/';

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
    
    const foodCollection = mongoose.connection.db.collection('food_items');
    const categoryCollection = mongoose.connection.db.collection('foodCategory');
    
    const foodData = await foodCollection.find({}).toArray();
    const categoryData = await categoryCollection.find({}).toArray();
    
    return { foodData, categoryData };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
