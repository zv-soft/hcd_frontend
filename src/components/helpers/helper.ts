import type { UserInterface } from "@/interfaces/users.interface";

export function isAdmin(user: UserInterface): boolean {
  let isAdmin = false;
  user.roles.forEach((role) => {
    if (role.name == "admin") isAdmin = true;
  });

  return isAdmin;
}

export function isSuperAdmin(user: UserInterface): boolean {
  let isAdmin = false;
  user.roles.forEach((role) => {
    if (role.name == "superadmin") isAdmin = true;
  });

  return isAdmin;
}


export const STATUS_LABELS: Record<string, string> = {
  processed: 'Procesado',
  pending: 'Pendiente',
  error: 'Error',
  indexed: 'Indexado',
  done: 'Completado',
}

export const STATUS_COLORS: Record<string, string> = {
  processed: 'success',
  indexed: 'success',
  pending: 'warning',
  error: 'error',
  done: 'success',
}

export function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function statusLabel(status: string) {
  return STATUS_LABELS[status] ?? status
}

export function statusColor(status: string) {
  return STATUS_COLORS[status] ?? 'default'
}
