// export interface TopicName {
// }

export interface Topic {
  _id?: string;
  name: string;
}

export interface TopicState {
  topic: Topic[];
}

export interface TopicResult {
  _id?: string;
  name: string;
  // createdAt: string;
  // updatedAt: string;
  // __v: number;
}
