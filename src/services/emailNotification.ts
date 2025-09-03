export interface EmailNotificationData {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  template: 'visitor-registration' | 'approval-notification' | 'rejection-notification' | 'cancellation-notification' | 'time-proposal-notification';
  data: {
    visitorName?: string;
    hostName?: string;
    companyName?: string;
    visitDate?: string;
    visitTime?: string;
    duration?: string;
    reasonForVisit?: string;
    accessRequired?: string;
    status?: 'approved' | 'rejected' | 'cancelled' | 'pending';
    remarks?: string;
    proposedTime?: string;
    proposedDate?: string;
    securityContact?: string;
    meetingId?: string;
  };
}

// Email templates
export const emailTemplates = {
  'visitor-registration': {
    subject: 'Visitor Registration - Meeting Request Submitted',
    visitorTemplate: `
      <h2>Visit Request Submitted Successfully</h2>
      <p>Dear {{visitorName}},</p>
      <p>Your visit request has been submitted successfully and is awaiting approval.</p>
      
      <h3>Visit Details:</h3>
      <ul>
        <li><strong>Host:</strong> {{hostName}}</li>
        <li><strong>Company:</strong> {{companyName}}</li>
        <li><strong>Date:</strong> {{visitDate}}</li>
        <li><strong>Time:</strong> {{visitTime}}</li>
        <li><strong>Duration:</strong> {{duration}}</li>
        <li><strong>Purpose:</strong> {{reasonForVisit}}</li>
        <li><strong>Access Required:</strong> {{accessRequired}}</li>
      </ul>
      
      <p>You will receive another email once your host approves the request.</p>
      <p>Thank you for using Identra Visitor Management System.</p>
    `,
    hostTemplate: `
      <h2>New Visitor Meeting Request</h2>
      <p>Dear {{hostName}},</p>
      <p>You have received a new visitor meeting request.</p>
      
      <h3>Visitor Details:</h3>
      <ul>
        <li><strong>Visitor Name:</strong> {{visitorName}}</li>
        <li><strong>Company:</strong> {{companyName}}</li>
        <li><strong>Date:</strong> {{visitDate}}</li>
        <li><strong>Time:</strong> {{visitTime}}</li>
        <li><strong>Duration:</strong> {{duration}}</li>
        <li><strong>Purpose:</strong> {{reasonForVisit}}</li>
        <li><strong>Access Required:</strong> {{accessRequired}}</li>
      </ul>
      
      <p>Please log in to the Identra dashboard to approve or reject this request.</p>
      <p><a href="/dashboard/approvals" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Review Request</a></p>
    `
  },
  'approval-notification': {
    subject: 'Visit Request Approved - Meeting Confirmed',
    visitorTemplate: `
      <h2 style="color: #28a745;">Visit Request Approved!</h2>
      <p>Dear {{visitorName}},</p>
      <p>Great news! Your visit request has been approved.</p>
      
      <h3>Confirmed Visit Details:</h3>
      <ul>
        <li><strong>Host:</strong> {{hostName}}</li>
        <li><strong>Date:</strong> {{visitDate}}</li>
        <li><strong>Time:</strong> {{visitTime}}</li>
        <li><strong>Duration:</strong> {{duration}}</li>
        <li><strong>Access Required:</strong> {{accessRequired}}</li>
      </ul>
      
      {{#if remarks}}
      <h3>Host Notes:</h3>
      <p>{{remarks}}</p>
      {{/if}}
      
      <p>Please arrive on time with a valid ID. You will be issued a visitor badge upon arrival.</p>
      <p>For any questions, please contact your host directly.</p>
    `
  },
  'rejection-notification': {
    subject: 'Visit Request - Update Required',
    visitorTemplate: `
      <h2 style="color: #dc3545;">Visit Request Status Update</h2>
      <p>Dear {{visitorName}},</p>
      <p>Your visit request requires attention.</p>
      
      <h3>Request Details:</h3>
      <ul>
        <li><strong>Host:</strong> {{hostName}}</li>
        <li><strong>Requested Date:</strong> {{visitDate}}</li>
        <li><strong>Requested Time:</strong> {{visitTime}}</li>
      </ul>
      
      {{#if remarks}}
      <h3>Message from Host:</h3>
      <p>{{remarks}}</p>
      {{/if}}
      
      <p>Please contact your host directly to discuss alternative arrangements.</p>
    `
  },
  'cancellation-notification': {
    subject: 'Visit Cancelled - Meeting Update',
    visitorTemplate: `
      <h2 style="color: #ffc107;">Visit Cancelled</h2>
      <p>Dear {{visitorName}},</p>
      <p>We regret to inform you that your scheduled visit has been cancelled.</p>
      
      <h3>Cancelled Visit Details:</h3>
      <ul>
        <li><strong>Host:</strong> {{hostName}}</li>
        <li><strong>Date:</strong> {{visitDate}}</li>
        <li><strong>Time:</strong> {{visitTime}}</li>
      </ul>
      
      {{#if remarks}}
      <h3>Cancellation Reason:</h3>
      <p>{{remarks}}</p>
      {{/if}}
      
      <p>Please contact your host if you need to reschedule or if you have any questions.</p>
    `
  },
  'time-proposal-notification': {
    subject: 'Visit Request - Alternative Time Proposed',
    visitorTemplate: `
      <h2 style="color: #17a2b8;">Alternative Time Proposed</h2>
      <p>Dear {{visitorName}},</p>
      <p>Your host has proposed an alternative time for your visit.</p>
      
      <h3>Originally Requested:</h3>
      <ul>
        <li><strong>Date:</strong> {{visitDate}}</li>
        <li><strong>Time:</strong> {{visitTime}}</li>
      </ul>
      
      <h3>Proposed Alternative:</h3>
      <ul>
        <li><strong>Date:</strong> {{proposedDate}}</li>
        <li><strong>Time:</strong> {{proposedTime}}</li>
      </ul>
      
      {{#if remarks}}
      <h3>Host Notes:</h3>
      <p>{{remarks}}</p>
      {{/if}}
      
      <p>This alternative time has been automatically approved. If you cannot make this time, please contact your host directly.</p>
    `
  }
};

// Email notification service (frontend simulation)
export class EmailNotificationService {
  private static instance: EmailNotificationService;

  private constructor() {}

  public static getInstance(): EmailNotificationService {
    if (!EmailNotificationService.instance) {
      EmailNotificationService.instance = new EmailNotificationService();
    }
    return EmailNotificationService.instance;
  }

  async sendNotification(notificationData: EmailNotificationData): Promise<boolean> {
    // Simulate email sending (in real implementation, this would call an API)
    console.log('📧 Email Notification Sent:', {
      to: notificationData.to,
      subject: notificationData.subject,
      template: notificationData.template,
      data: notificationData.data
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, show a toast notification
    this.showToastNotification(notificationData);

    return true;
  }

  private showToastNotification(notificationData: EmailNotificationData) {
    // Create a visual notification for demo purposes
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="text-lg">📧</div>
          <div>
            <div class="font-semibold">Email Sent</div>
            <div class="text-sm opacity-90">To: ${notificationData.to.join(', ')}</div>
            <div class="text-xs opacity-75">${notificationData.subject}</div>
          </div>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 4000);
    }
  }

  // Helper methods for common notification scenarios
  async sendVisitorRegistrationNotification(data: {
    visitorEmail: string;
    hostEmail: string;
    visitorName: string;
    hostName: string;
    companyName: string;
    visitDate: string;
    visitTime: string;
    duration: string;
    reasonForVisit: string;
    accessRequired: string;
  }): Promise<boolean> {
    return this.sendNotification({
      to: [data.visitorEmail, data.hostEmail],
      subject: emailTemplates['visitor-registration'].subject,
      template: 'visitor-registration',
      data: {
        visitorName: data.visitorName,
        hostName: data.hostName,
        companyName: data.companyName,
        visitDate: data.visitDate,
        visitTime: data.visitTime,
        duration: data.duration,
        reasonForVisit: data.reasonForVisit,
        accessRequired: data.accessRequired,
        status: 'pending'
      }
    });
  }

  async sendApprovalNotification(data: {
    visitorEmail: string;
    visitorName: string;
    hostName: string;
    visitDate: string;
    visitTime: string;
    duration: string;
    accessRequired: string;
    remarks?: string;
  }): Promise<boolean> {
    return this.sendNotification({
      to: [data.visitorEmail],
      subject: emailTemplates['approval-notification'].subject,
      template: 'approval-notification',
      data: {
        visitorName: data.visitorName,
        hostName: data.hostName,
        visitDate: data.visitDate,
        visitTime: data.visitTime,
        duration: data.duration,
        accessRequired: data.accessRequired,
        status: 'approved',
        remarks: data.remarks
      }
    });
  }

  async sendRejectionNotification(data: {
    visitorEmail: string;
    visitorName: string;
    hostName: string;
    visitDate: string;
    visitTime: string;
    remarks?: string;
  }): Promise<boolean> {
    return this.sendNotification({
      to: [data.visitorEmail],
      subject: emailTemplates['rejection-notification'].subject,
      template: 'rejection-notification',
      data: {
        visitorName: data.visitorName,
        hostName: data.hostName,
        visitDate: data.visitDate,
        visitTime: data.visitTime,
        status: 'rejected',
        remarks: data.remarks
      }
    });
  }

  async sendCancellationNotification(data: {
    visitorEmail: string;
    hostEmail?: string;
    securityEmail?: string;
    visitorName: string;
    hostName: string;
    visitDate: string;
    visitTime: string;
    remarks?: string;
  }): Promise<boolean> {
    const recipients = [data.visitorEmail];
    if (data.hostEmail) recipients.push(data.hostEmail);
    if (data.securityEmail) recipients.push(data.securityEmail);

    return this.sendNotification({
      to: recipients,
      subject: emailTemplates['cancellation-notification'].subject,
      template: 'cancellation-notification',
      data: {
        visitorName: data.visitorName,
        hostName: data.hostName,
        visitDate: data.visitDate,
        visitTime: data.visitTime,
        status: 'cancelled',
        remarks: data.remarks
      }
    });
  }

  async sendTimeProposalNotification(data: {
    visitorEmail: string;
    visitorName: string;
    hostName: string;
    originalDate: string;
    originalTime: string;
    proposedDate: string;
    proposedTime: string;
    remarks?: string;
  }): Promise<boolean> {
    return this.sendNotification({
      to: [data.visitorEmail],
      subject: emailTemplates['time-proposal-notification'].subject,
      template: 'time-proposal-notification',
      data: {
        visitorName: data.visitorName,
        hostName: data.hostName,
        visitDate: data.originalDate,
        visitTime: data.originalTime,
        proposedDate: data.proposedDate,
        proposedTime: data.proposedTime,
        remarks: data.remarks
      }
    });
  }
}

export const emailService = EmailNotificationService.getInstance();
