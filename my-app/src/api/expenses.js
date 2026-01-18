// ================= BASE API CONFIG =================

// Use Vercel env in production, localhost in dev
const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://expense-tracker-backend-u4so.onrender.com/api";

// ================= AUTH HEADERS =================

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text || "{}");
  } catch {
    return text;
  }
}

/* ================= EXPENSE APIs ================= */

export async function addExpense(data) {
  const res = await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Add failed: ${res.status}`);
  }
  return handleResponse(res);
}

export async function fetchExpenses({
  page = 1,
  q = "",
  category = "",
  date = "",
} = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (date) params.set("date", date);

  const res = await fetch(
    `${API_BASE}/expenses?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    }
  );

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Fetch failed: ${res.status}`);
  }
  return handleResponse(res);
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Delete failed: ${res.status}`);
  }
  return handleResponse(res);
}

export async function updateExpense(id, payload) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Update failed: ${res.status}`);
  }
  return handleResponse(res);
}

export async function getSummary() {
  const res = await fetch(`${API_BASE}/expenses/summary`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Summary fetch failed: ${res.status}`);
  }
  return handleResponse(res);
}

export async function getExpenseById(id) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Fetch expense failed: ${res.status}`);
  }
  return handleResponse(res);
}

/* ================= BUDGET APIs ================= */

export async function getBudget() {
  const res = await fetch(`${API_BASE}/budget`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Budget fetch failed: ${res.status}`);
  }
  return handleResponse(res);
}

export async function setBudget(monthlyBudget) {
  const res = await fetch(`${API_BASE}/budget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ monthlyBudget }),
  });

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Budget save failed: ${res.status}`);
  }
  return handleResponse(res);
}

/* ================= HEATMAP API ================= */

export async function getHeatmap(days = 30) {
  const res = await fetch(
    `${API_BASE}/expenses/heatmap?days=${days}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    }
  );

  if (!res.ok) {
    const body = await handleResponse(res);
    throw new Error(body.message || `Heatmap fetch failed: ${res.status}`);
  }

  return handleResponse(res);
}
