'use server';

import { revalidatePath } from 'next/cache';
import { connectToMongoDB } from '@/lib/mongodb';
import { Account } from '@/models/accountSchema';

export async function accountForm(formData: FormData) {
  await connectToMongoDB(); // Ensure MongoDB connection is established

  // Retrieve and parse the categories data from the formData
  const categoriesData = formData.get('categories');
  const categories = categoriesData ? JSON.parse(categoriesData as string) : [];

  console.log("Received categories:", categories);

  try {
    // Create a new Account document with the categories
    const newAccount = new Account({ categories });
    
    // Save the document to the database
    await newAccount.save();
    console.log("Categories saved to Account collection:", newAccount);

    // Optionally, revalidate the path if needed after saving
    revalidatePath('/');
  } catch (error) {
    console.error("Error saving categories to Account collection:", error);
  }
}
