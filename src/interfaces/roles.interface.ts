

export interface RoleWithPagination{
    data: Role[];
    totalPages: number;
}
export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
}
export interface Permission {
    id: string;
    display: string;
    key: string;
    group: string;
}