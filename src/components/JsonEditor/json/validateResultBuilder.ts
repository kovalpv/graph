export interface Validation {
  readonly messages?: string[];
  readonly success: boolean;
}

export default function validateResultBuilder() {
  const messages: string[] = [];

  return {
    addError(message: string) {
      messages.push(message);
      return this;
    },
    build(): Validation {
      return !messages.length ?
        { success: true } :
        { success: false, messages };
    },
  };
}
