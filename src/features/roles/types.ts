export interface IRole {
  roleId?: number;
  name: string;
  isAbleToManageCategory: boolean | string;
  isAbleToManageMovies: boolean | string;
  isAbleToManageRole: boolean | string;
  isAbleToManageUser: boolean | string;
}
