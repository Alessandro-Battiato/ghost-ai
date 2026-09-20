import type { ReactNode } from "react";
import { FileText, Share2, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const features = [
  {
    description: "Describe your system and turn it into a live canvas.",
    icon: Sparkles,
    title: "AI architecture generation",
  },
  {
    description: "Edit designs together with live presence and cursors.",
    icon: Share2,
    title: "Real-time collaboration",
  },
  {
    description: "Export a complete technical specification from your graph.",
    icon: FileText,
    title: "Instant spec generation",
  },
];

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen bg-base xl:grid-cols-2">
      <section className="hidden min-h-screen border-r border-surface-border bg-surface px-10 py-10 xl:flex xl:flex-col xl:justify-between 2xl:px-20 2xl:py-12">
        <div className="flex items-center gap-3 text-lg font-semibold tracking-tight text-copy-primary">
          <span aria-hidden className="h-10 w-10 rounded-xl bg-brand" />
          Ghost AI
        </div>
        <div className="max-w-xl space-y-16">
          <div className="space-y-5">
            <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-copy-primary 2xl:text-5xl">
              Design systems at the speed of thought.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-copy-secondary">
              Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
            </p>
          </div>
          <ul className="space-y-8">
            {features.map(({ description, icon: Icon, title }) => (
              <li className="flex items-start gap-4" key={title}>
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand bg-accent-dim text-brand">
                  <Icon aria-hidden className="h-4 w-4" />
                </span>
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-copy-primary">{title}</h2>
                  <p className="text-sm leading-6 text-copy-secondary">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-copy-faint">© 2026 Ghost AI. All rights reserved.</p>
      </section>
      <section className="flex min-h-screen items-center justify-center bg-base p-6 sm:p-10">
        <div className="w-full max-w-md font-sans">{children}</div>
      </section>
    </main>
  );
}
