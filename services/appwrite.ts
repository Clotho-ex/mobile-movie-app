// Track Searches made by the user
import { Client, Databases, ID, Query } from "react-native-appwrite";

// Validate environment variables
const validateEnvVars = () => {
  const requiredVars = [
    "EXPO_PUBLIC_APPWRITE_DATABASE_ID",
    "EXPO_PUBLIC_APPWRITE_COLLECTION_ID",
    "EXPO_PUBLIC_APPWRITE_ENDPOINT",
    "EXPO_PUBLIC_APPWRITE_PROJECT_ID",
  ];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.error("Missing required Appwrite environment variables:", missing);
    throw new Error(
      `Missing Appwrite environment variables: ${missing.join(", ")}`
    );
  }
};

// Validate on module load
validateEnvVars();

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

// Test database connection (useful for debugging)
export const testDatabaseConnection = async () => {
  try {
    console.log("Testing Appwrite database connection...");
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, []);
    console.log(
      "Database connection successful. Document count:",
      result.documents.length
    );
    return { success: true, documentCount: result.documents.length };
  } catch (error) {
    console.error("Database connection failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : error,
    };
  }
};

export const updateSearchCount = async (query: string, movie: Movie) => {
  // Check if the search has already been made
  // If it has, update the count
  // If it hasn't, create a new document

  if (!query?.trim()) {
    throw new Error("Search query cannot be empty");
  }

  if (!movie?.id || !movie?.title) {
    throw new Error("Invalid movie data provided");
  }

  try {
    console.log(`Searching for existing search term: "${query}"`);

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query.trim()),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      console.log(
        `Updating count for existing search: "${query}" from ${
          existingMovie.count
        } to ${existingMovie.count + 1}`
      );

      const updatedDoc = await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );

      console.log("Search count updated successfully:", updatedDoc);
      return updatedDoc;
    } else {
      console.log(`Creating new search record for: "${query}"`);

      const newDoc = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query.trim(),
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );

      console.log("New search record created successfully:", newDoc);
      return newDoc;
    }
  } catch (error) {
    console.error("Failed to update search count:", {
      query,
      movieId: movie.id,
      error: error instanceof Error ? error.message : error,
    });
    throw error;
  }
};
