const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function generateWorkoutPlan(formData) {
  const response = await fetch(`${API_BASE}/api/workouts/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body.message || body.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  const { plan } = await response.json();
  return plan;
}
