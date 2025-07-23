import { ConvexError } from 'convex/values';

export const generateErrorMessage = (
  error: unknown,
  message: string
): string => {
  return error instanceof ConvexError ? (error.data as string) : message;
};
