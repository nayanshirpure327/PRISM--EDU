import { createSupabaseServiceClient } from '@/lib/supabase/server';
import axios from 'axios';

export interface TrackEventPayload {
  student_id: string;
  event_type: string;
  event_data?: Record<string, unknown>;
  session_id?: string;
}

export class ActivityService {
  private mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';

  /**
   * Log a student interaction event to the centralized activity_events system
   */
  async recordEvent(payload: TrackEventPayload): Promise<void> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isLiveDb = supabaseUrl && !supabaseUrl.includes('your-project') && !supabaseUrl.includes('test.supabase');

    if (isLiveDb) {
      try {
        const supabase = createSupabaseServiceClient();
        await supabase.from('activity_events').insert({
          student_id: payload.student_id,
          event_type: payload.event_type,
          event_data: payload.event_data || {},
          session_id: payload.session_id,
        });
      } catch (err) {
        console.error('Failed to log activity event to database:', err);
      }
    }

    // Trigger asynchronous feature re-aggregation on high-impact milestone events
    const triggerEvents = [
      'QUIZ_COMPLETED',
      'ASSIGNMENT_SUBMITTED',
      'RESOURCE_COMPLETED',
      'AI_LEARNING_INTERACTION'
    ];

    if (triggerEvents.includes(payload.event_type)) {
      this.triggerAnalyticsUpdate(payload.student_id).catch(() => {
        // Non-blocking background sync
      });
    }
  }

  /**
   * Notify Python ML service to re-aggregate features and update student_insights
   */
  async triggerAnalyticsUpdate(studentId: string): Promise<void> {
    try {
      await axios.post(`${this.mlServiceUrl}/analytics/compute/${studentId}`, {}, {
        timeout: 3000,
      });
    } catch {
      // Graceful offline/stand-alone fallback
    }
  }
}

export const activityService = new ActivityService();
