// Track Searches made by the user
import { Client, Databases, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  // Check if the search has already been made
  // If it has, update the count
  // If it hasn't, create a new document

  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    //@ts-ignore
    Query.equal("searchTerm", query),
  ]);

  console.log(result);
};
