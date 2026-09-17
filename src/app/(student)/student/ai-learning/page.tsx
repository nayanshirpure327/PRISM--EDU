'use client';

import * as React from 'react';
import { ChatWindow } from '@/components/ai/chat-window';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bot, BookOpen, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function AILearningAgentPage() {
  const suggestedAcademicQuestions = [
    'Explain Database Normalization from 1NF to BCNF with examples',
    'How does Dijkstra algorithm find the shortest path in a graph?',
    'What are ACID properties in database transactions and why is Isolation needed?',
    'What is the difference between 3NF and BCNF?',
    'Explain process scheduling and deadlocks in Operating Systems',
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            RAG-Powered Academic Assistant
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ShieldCheck className="h-3 w-3" />
            Curriculum Grounded
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Learning Agent</h2>
        <p className="text-sm text-slate-500">
          Dedicated academic tutor for doubt-solving, step-by-step concept explanations, practice questions, and exam review.
        </p>
      </div>

      {/* Grid: Chat Window + Side Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ChatWindow
            agentType="learning"
            title="PRISM Academic AI"
            subtitle="Academic Learning & Doubt Solving Engine"
            endpoint="/api/ai/learning-chat"
            suggestedQuestions={suggestedAcademicQuestions}
            privacyNotice="Academic Privacy: Your private doubt questions are never visible to faculty. Only high-level subject interaction counts are logged for curriculum optimization."
          />
        </div>

        {/* Side Guidance & Academic Capabilities */}
        <div className="space-y-4">
          <Card className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <CardTitle className="text-sm font-bold">Supported Academic Tasks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Step-by-step concept explanations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Code walkthroughs and proofs</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Practice exam problems & quizzes</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Lecture notes summaries</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 bg-gradient-to-b from-indigo-50/40 to-white p-4">
            <h5 className="font-bold text-xs text-indigo-900 mb-1 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-indigo-600" />
              <span>Prompting Tip</span>
            </h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              For math proofs or algorithms, ask: <br />
              <code className="text-indigo-800 bg-indigo-50 px-1 py-0.5 rounded font-mono mt-1 block">
                &quot;Break down Dijkstra step-by-step with a 4-node trace.&quot;
              </code>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
