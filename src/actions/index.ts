"use server";

import { db } from "@/db";
import { Snippet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addSnippet(formData: any) {

  const existingSnippet = await db.snippet.findFirst({
    where: { title: formData.title }, // Check if a snippet with the same title exists
  });


  if (formData.title.length < 10 || formData.title.length > 100) {
    throw Error("The title must be at least 10 characters and at most 100 characters");
  }

  if (formData.code.length<10) {
    throw Error("The code must be at least 10 characters");
  }


  if (existingSnippet) {
    throw new Error("Title already exists. Please use a different title.");
  }

  const snippet = await db.snippet.create({
    data: formData,
  });

  console.log("Snippet", snippet);

  revalidatePath('/');
  redirect("/");
}

export async function editSnippet(id: number, formData: any) {
  console.log("editing snippet: ", formData);

  const existingSnippet = await db.snippet.findFirst({
    where: {
      title: formData.title,
      NOT: { id }, // Ensure we exclude the snippet being edited
    },
  });

  if (formData.title.length < 10 || formData.title.length > 100) {
    throw Error("The title must be at least 10 characters and at most 100 characters");
  }

  if (formData.code.length<10) {
    throw Error("The code must be at least 10 characters");
  }

  if (existingSnippet) {
    throw Error("Cannot update: The title already exists. Please choose a different title.");
  }

  if (id) {
    await db.snippet.update({
      where: { id: id },
      data: formData,
    });
  }

  revalidatePath(`/snippets/${id}`);

  redirect("/");
}


export async function deletSnippet(id:number) {

    await db.snippet.delete({ where: { id } });
    revalidatePath('/');
    redirect('/');
  

}

export async function getSnippetById(id: string): Promise<Snippet | null> {
  try {
    const snippet = await db.snippet.findUnique({
      where: { id: parseInt(id) }
    });
    return snippet;
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return null;
  }
}
export async function getAllSnippets() {
  const snippets =  await db.snippet.findMany();

  return snippets;
}

