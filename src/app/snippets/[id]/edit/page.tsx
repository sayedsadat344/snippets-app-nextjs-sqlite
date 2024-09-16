import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/solid";
import SnippetForm from "@/components/SnippetForm";
import * as actions from "@/actions";
import { Snippet } from "@prisma/client";

interface ViewSnippetProps {
  params: {
    id: string;
  };
}

export default async function EditSnippet({ params }: ViewSnippetProps) {
  const snippet: Snippet | null = await actions.getSnippetById(params.id);

  if (!snippet) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold mb-4">Update Snippet</h1>

        <SnippetForm snippet={snippet}/>
        

       
      </div>
    </div>
  );
}
