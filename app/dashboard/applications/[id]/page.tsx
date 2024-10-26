// app/dashboard/applications/[id]/page.tsx
import { getApplicationStatus } from '@/lib/application';
import { ApplicationTimeline } from '@/components/ApplicationTimeline';
import { DocumentRequests } from '@/components/DocumentRequests';
import { CommunicationHistory } from '@/components/CommunicationHistory';

interface ApplicationStatus {
    stage: 'submitted' | 'processing' | 'review' | 'approved' | 'rejected';
    currentStep: number;
    totalSteps: number;
    estimatedCompletionDate: Date;
    lastUpdate: Date;
    notes: string[];
}

export default function ApplicationPage({ params }: { params: { id: string } }) {
  const status = getApplicationStatus(params.id);

  return (
    <div>
      <h1>Application {params.id}</h1>
      <ApplicationTimeline status={status} />
      <DocumentRequests />
      <CommunicationHistory />
    </div>
  );
}
