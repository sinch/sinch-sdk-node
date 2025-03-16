/**
 * A configured option that the user can trigger to perform an action.
 */
export interface Option {
  /** A DTMF digit the user can press to trigger the configured action. */
  dtmf: string;
  /**
   * Determines which action is taken when the DTMF digit is pressed. The following values are accepted:
   * - If you want to navigate to another menu, use `menu(value)`.
   * - If you want to perform another behavior you have coded in your application, use `return(value)`, where `(value)` is the name of the method you want to execute.
   */
  action: string;
}
