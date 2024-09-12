"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function addSnippet(formData: any) {
  console.log("adding snippet: ", formData);

  const existingSnippet = await db.snippet.findFirst({
    where: { title: formData.title }, // Check if a snippet with the same title exists
  });

  if (existingSnippet) {
    throw new Error("Title already exists. Please use a different title.");
  }

  const snippet = await db.snippet.create({
    data: formData,
  });

  console.log("Snippet", snippet);
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

  if (existingSnippet) {
    throw new Error("Cannot update: The title already exists. Please choose a different title.");
  }

  if (id) {
    await db.snippet.update({
      where: { id: id },
      data: formData,
    });
  }

  redirect("/");
}
