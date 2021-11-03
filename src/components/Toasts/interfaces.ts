export interface ToastMessage {
  readonly id: number;
  readonly title: string;
  readonly message: string | React.ReactNode;
  readonly closeOnlyHuman?: boolean;
  readonly isAlert?: boolean;
}
