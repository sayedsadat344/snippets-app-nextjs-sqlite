import { db } from '@/db';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { revalidatePath } from 'next/cache';
import SnippetActions from '@/components/snippetActions';


interface ViewSnippetProps {
  params: {
    id: string;
  };
}


async function deleteSnippet(id: number) {
  'use server';
  await db.snippet.delete({ where: { id } });
  revalidatePath('/');
  redirect('/');
}


export default async function ViewSnippet({ params }: ViewSnippetProps) {

  
  const snippet = await db.snippet.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{snippet.title}</h2>
            <div className="flex space-x-2">
              <SnippetActions 
                snippetId={snippet.id} 
                snippetCode={snippet.code} 
                onDelete={deleteSnippet}
              />
              <Link 
                href={`/snippets/${snippet.id}/edit`}
                className="text-blue-600 hover:text-blue-800"
                title="Edit snippet"
              >
                <PencilIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="px-6 py-4">
            <pre className="bg-gray-800 rounded-md p-4 overflow-x-auto h-80">
              <code className="text-sm text-white">{snippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}