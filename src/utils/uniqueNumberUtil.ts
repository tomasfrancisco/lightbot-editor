let currentNumber = -1;

/**
 * Gives back a new integer every time.
 * The result is only unique per session.
 * Limits: Number underflow.
 */
export function getUniqueNumberForSession() {
  return currentNumber--;
}
