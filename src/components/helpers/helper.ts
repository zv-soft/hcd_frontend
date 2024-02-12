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
