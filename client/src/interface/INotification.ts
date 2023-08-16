export interface Notification {
  status: string;
  title: string;
  message: string;
}

export interface NotificationState {
  notification: Notification;
}
