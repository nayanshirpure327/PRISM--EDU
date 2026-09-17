'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatWindow } from '@/components/ai/chat-window';
import { LifeBuoy, Mail, Phone, Clock, MapPin, ShieldCheck, Heart, AlertCircle } from 'lucide-react';

export default function StudentSupportPage() {
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/student/support')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const counsellors = data?.counsellors || [
    {
      id: 'c1',
      name: 'Dr. Aruna Sharma, Ph.D.',
      specialization: 'Student Wellness, Academic Stress & Anxiety Management',
      email: 'wellness.counsellor@prismedu.com',
      mobile: '+91 9822334455',
      availability: 'Mon - Fri: 10:00 AM - 4:00 PM (In-person & Confidential Video Call)',
      office_location: 'Student Welfare Centre, Block B, Room 204',
    },
    {
      id: 'c2',
      name: 'Prof. Rajesh Ramanathan',
      specialization: 'Career Transitions, Motivation & Personal Mentorship',
      email: 'mentorship@prismedu.com',
      mobile: '+91 9822334456',
      availability: 'Tue, Thu, Sat: 2:00 PM - 5:00 PM',
      office_location: 'Academic Block C, Room 112',
    },
  ];

  const suggestedSupportQuestions = [
    'How do I book a confidential session with Dr. Aruna Sharma?',
    'I am feeling stressed about semester exams and attendance',
    'Where is the on-campus student wellness centre located?',
    'What emergency student helpline numbers are available?',
  ];

  if (isLoading) {
    return <div className="p-12 text-center text-xs text-slate-400">Loading support resources...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Personal & Family Support
        </h2>
        <p className="text-sm text-slate-500">
          Campus professional counselling services and supportive institutional guidance companion.
        </p>
      </div>

      {/* Mandatory Disclaimer (Section 13) */}
      <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60 text-purple-900 flex items-start gap-3">
        <Heart className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold">Confidential Support & Campus Wellness</span>
          <p className="text-purple-800 leading-relaxed">
            {data?.aiSupportDisclaimer ||
              'The AI companion provides supportive guidance and connects you to institutional resources. It is not a substitute for licensed counsellors or crisis services. For serious emotional distress, please contact Dr. Aruna Sharma or visit the Wellness Centre.'}
          </p>
        </div>
      </div>

      {/* Part 1: Official Institutional Counsellor Directory (Section 13) */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <LifeBuoy className="h-4 w-4 text-purple-600" />
          <span>Approved Campus Counsellors</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {counsellors.map((c: any) => (
            <Card key={c.id} className="border-slate-200 hover:shadow-xs transition-all">
              <CardContent className="p-5 space-y-3">
                <div>
                  <h4 className="font-bold text-base text-slate-900">{c.name}</h4>
                  <p className="text-xs text-purple-700 font-medium mt-0.5">{c.specialization}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <a href={`mailto:${c.email}`} className="text-indigo-600 hover:underline">
                      {c.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-800">{c.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{c.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{c.office_location}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a href={`mailto:${c.email}?subject=Confidential%20Mentorship%20Request`}>
                    <Button size="sm" variant="outline" className="w-full text-xs gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-purple-600" />
                      <span>Book Appointment</span>
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Part 2: AI Supportive Guidance Agent (Section 13) */}
      <div className="pt-4 border-t border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Heart className="h-4 w-4 text-purple-600" />
          <span>PRISM AI Support Companion</span>
        </h3>
        <ChatWindow
          agentType="support"
          title="PRISM Institutional Support Companion"
          subtitle="Basic supportive guidance and campus resource connections"
          endpoint="/api/ai/support-chat"
          suggestedQuestions={suggestedSupportQuestions}
          privacyNotice="Privacy Protection: Personal support conversations are private and never shared with faculty or academic portals."
        />
      </div>
    </div>
  );
}
