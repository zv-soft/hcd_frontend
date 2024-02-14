

export interface RoleWithPagination{
    data: Role[];
    totalPages: number;
}
export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: Permission[];
}
export interface Permission {
    id: number;
    display: string;
    key: string;
    group: string;
}