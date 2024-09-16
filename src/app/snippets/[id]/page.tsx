import Link from 'next/link';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import SnippetActions from '@/components/snippetActions';
import * as actions from "@/actions";
import { notFound } from 'next/navigation';
import { Snippet } from '@prisma/client';

interface ViewSnippetProps {
  params: { id: string };
}

export default async function ViewSnippet({ params }: ViewSnippetProps) {
  const snippet = await actions.getSnippetById(params.id);
  if (!snippet) notFound();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <BackLink />
        <SnippetCard snippet={snippet} />
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
      <ArrowLeftIcon className="h-5 w-5 mr-2" />
      Back to Home
    </Link>
  );
}

function SnippetCard({ snippet }:{ snippet:Snippet}) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <SnippetHeader title={snippet.title} id={snippet.id} code={snippet.code} />
      <SnippetCode code={snippet.code} />
    </div>
  );
}

function SnippetHeader({ title, id,code }: { title: string; id: number,code:string }) {
  return (
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex space-x-2">
        <SnippetActions snippetId={id} snippetCode={code} onDelete={actions.deletSnippet} />
        <EditLink id={id} />
      </div>
    </div>
  );
}

function EditLink({ id }:{id:number}) {
  return (
    <Link href={`/snippets/${id}/edit`} className="text-blue-600 hover:text-blue-800" title="Edit snippet">
      <PencilIcon className="h-5 w-5" />
    </Link>
  );
}

function SnippetCode({ code }:{code:string}) {
  return (
    <div className="px-6 py-4">
      <pre className="bg-gray-800 rounded-md p-4 overflow-x-auto h-80">
        <code className="text-sm text-white">{code}</code>
      </pre>
    </div>
  );
}