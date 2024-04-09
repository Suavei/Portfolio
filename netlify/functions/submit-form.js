const mongodb = require('mongodb/lib/mongodb');
const uri = process.env.MONGODB_URI;

exports.handler = async (event, context) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const client = await mongodb.MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const database = client.db('mydb');
    const collection = database.collection('sae');
    const newDocument = { name, email, message };

    const result = await collection.insertOne(newDocument);
    console.log(`Document inserted with _id: ${result.insertedId}`);

    // Close the MongoDB connection
    client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form data submitted successfully' }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error submitting form data' }),
    };
  }
};
