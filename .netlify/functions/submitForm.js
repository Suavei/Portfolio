const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
  const uri = 'YOUR_MONGODB_URI_HERE';
  
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('YOUR_DATABASE_NAME');
    const collection = database.collection('YOUR_COLLECTION_NAME');

    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // Save form data to MongoDB
    await collection.insertOne({ name, email, message });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form data saved successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to save form data' }),
    };
  } finally {
    await client.close();
  }
};
