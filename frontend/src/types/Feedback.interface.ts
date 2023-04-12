export interface Feedback {
  firstName?: string;
  lastName?: string;
  email: string;
  category: string;
  message: string;
  image: FileList;
}

export type FeedbackFields =
  | 'firstName'
  | 'lastName'
  | 'image'
  | 'email'
  | 'category';
