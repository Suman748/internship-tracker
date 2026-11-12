// Mirror the server rules so users get instant feedback.
export function validateTask(task) {
  const errors = {};
  const title = (task.title || "").trim();
  if (!title) errors.title = "Title is required";
  else if (title.length < 3) errors.title = "Title must be at least 3 characters";
  else if (title.length > 100) errors.title = "Title must be at most 100 characters";
  if ((task.description || "").length > 500)
    errors.description = "Description must be at most 500 characters";
  return errors; // empty object = valid
}

// Turn a failed fetch Response / thrown error into a friendly message.
export async function toErrorMessage(err) {
  if (err instanceof Response) {
    try {
      const body = await err.json();
      return body.message || body.error || `Server error (${err.status})`;
    } catch {
      return `Server error (${err.status})`;
    }
  }
  if (err instanceof TypeError) return "Cannot reach the server. Is the API running?";
  return err?.message || "Something went wrong";
}
