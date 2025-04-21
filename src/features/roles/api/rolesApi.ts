import { api } from "@/services/api/api";
import { IRole } from "../types";

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<IRole[], void>({
      query: () => ({
        url: "/role",
        method: "GET",
      }),
    }),

    deleteRole: builder.mutation<void, { roleId: number }>({
      query: ({ roleId }) => ({
        url: `/role/${roleId}`,
        method: "DELETE",
      }),
    }),

    addRole: builder.mutation<void, { form: Object }>({
      query: ({ form }) => ({
        url: "/role",
        method: "POST",
        body: form,
      }),
    }),

    updateRole: builder.mutation<void, { roleId: number; form: Object }>({
      query: ({ roleId, form }) => ({
        url: `/role/${roleId}`,
        method: "PATCH",
        body: form,
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useDeleteRoleMutation,
  useAddRoleMutation,
  useUpdateRoleMutation,
} = rolesApi;
