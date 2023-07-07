import { SetMetadata } from "@nestjs/common";
import { ROLES } from "src/constants/roles";
import { ROLES_KEY } from "src/constants/key-decorators";

export const Roles = (...roles: Array<keyof typeof ROLES>) => SetMetadata(ROLES_KEY, roles)