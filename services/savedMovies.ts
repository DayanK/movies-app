import { client } from "./appwrite";
import { Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const SAVED_COLLECTION_ID = "saved-movies"; // You'll need to create this collection

const database = new Databases(client);

export const saveMovie = async (movie: Movie) => {
  try {
    // Check if already saved
    const existing = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("movie_id", movie.id)]
    );

    if (existing.documents.length > 0) {
      return { success: false, message: "Already saved" };
    }

    await database.createDocument(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      ID.unique(),
      {
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
        saved_at: new Date().toISOString(),
      }
    );

    return { success: true, message: "Movie saved!" };
  } catch (error) {
    console.error("Error saving movie:", error);
    return { success: false, message: "Failed to save" };
  }
};

export const unsaveMovie = async (movieId: number) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("movie_id", movieId)]
    );

    if (result.documents.length > 0) {
      await database.deleteDocument(
        DATABASE_ID,
        SAVED_COLLECTION_ID,
        result.documents[0].$id
      );
      return { success: true, message: "Movie removed" };
    }

    return { success: false, message: "Not found" };
  } catch (error) {
    console.error("Error removing movie:", error);
    return { success: false, message: "Failed to remove" };
  }
};

export const getSavedMovies = async (): Promise<any[]> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.orderDesc("saved_at"), Query.limit(100)]
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return [];
  }
};

export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("movie_id", movieId)]
    );

    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking if movie is saved:", error);
    return false;
  }
};
