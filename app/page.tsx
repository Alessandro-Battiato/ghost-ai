import { EditorLayout } from "@/components/editor/editor-layout";

export default function Home() {
  return (
    <EditorLayout>
      <main className="grid h-full place-items-center bg-base">
        <p className="text-copy-muted">Ghost AI</p>
      </main>
    </EditorLayout>
  );
}
