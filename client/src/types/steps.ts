type BaseStep = {
  completed: boolean;
};

export type ConfigureStep = BaseStep & {
  name: string;
  number: string;
  message: string;
};

export type RecipientsStep = BaseStep & {
  numbers: string[];
  selectedFile: File | null;
};

export type ReviewStep = BaseStep & {
  broadcastId: string;
};
