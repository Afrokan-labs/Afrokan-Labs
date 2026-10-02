/** A business fact that has been confirmed (not a TODO_ placeholder). Unconfirmed facts are omitted. */
export const confirmed = (value: string | undefined): value is string =>
  !!value && !value.startsWith("TODO_");
