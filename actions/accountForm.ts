'use server';

import { revalidatePath } from 'next/cache';
import { connectToMongoDB } from '@/lib/mongodb'; // Ensure this file establishes MongoDB connection
import {Account} from '@/models/accountSchema'; // Use default import for the model

export async function accountForm(formData: FormData) {
  const categoriesData = formData.get('categories');
  const categories = categoriesData ? JSON.parse(categoriesData as string) : [];
  
  console.log("Received categories:", categories);

  try {
    await connectToMongoDB();
    console.log("Connected to MongoDB successfully");

    const savedCategories = [];
    for (const category of categories) {
      const existingCategory = await Account.findOne({ name: category.name }).lean();
      if (!existingCategory) {
        const newCategory = new Account({
          name: category.name,
          category: category.category || "default category", // Ensure category field is handled
        });
        const savedCategory = await newCategory.save();
        savedCategories.push(savedCategory.toObject()); // Convert to plain object
        console.log("Saved new category:", savedCategory);
      } else {
        savedCategories.push(existingCategory);  // Already a plain object
        console.log("Category already exists:", existingCategory);
      }
    }

    // Revalidate path to update client-side data if needed
    revalidatePath('/your-path');

    return { success: true, savedCategories };
  } catch (error) {
    console.error("Error in accountForm server action:", error);
    return { success: false, message: "An error occurred while processing categories." };
  }
}
