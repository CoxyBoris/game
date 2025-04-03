export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;

  if (error instanceof Error) return error.message;

  if (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray((error as any).errors)
  ) {
    const message = (error as any).errors[0]?.message;
    if (typeof message === "string") return message;
  }

  return "Something went wrong";
}
