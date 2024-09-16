import Link from "next/link";
import { EyeIcon } from '@heroicons/react/24/solid';
import * as actions from "@/actions";
import { Snippet } from "@prisma/client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const snippets = await actions.getAllSnippets();

  return (
    <main className="container mx-auto p-4">
      <Header />
      <SnippetList snippets={snippets} />
    </main>
  );
}

function Header() {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Snippet List</h2>
      <Link href="/snippets/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        New
      </Link>
    </div>
  );
}

function SnippetList({ snippets }: { snippets: Snippet[] }) {
  if (snippets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="space-y-2">
      {snippets.map((snippet) => (
        <SnippetItem key={snippet.id} snippet={snippet} />
      ))}
    </ul>
  );
}

function SnippetItem({ snippet }: { snippet: Snippet }) {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-4 rounded">
      <span className="font-medium text-gray-800">{snippet.title}</span>
      <Link
        href={`/snippets/${snippet.id}`}
        className="text-green-600 hover:text-green-800"
        title="View snippet"
      >
        <EyeIcon className="h-5 w-5" />
      </Link>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-10">
      <p className="text-xl text-gray-600 mb-4">No snippets available</p>
      <p className="text-gray-500">Create a new snippet to get started!</p>
    </div>
  );
}

export async function generateStaticParams() {
  const cachedSnippets = await actions.getAllSnippets();
 
  return cachedSnippets.map((s) => ({
    id: s.id.toString(),
  }))
}