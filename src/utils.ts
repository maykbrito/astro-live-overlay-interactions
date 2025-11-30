/** @description This function replaces all < and > with safe HTML characters to prevent XSS attacks */
export function sanitizeMessage(message: string): string {
  return message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
