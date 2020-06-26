export enum AlertType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
}

export type AlertDto = {
  message?: string;
  type?: AlertType;
};
