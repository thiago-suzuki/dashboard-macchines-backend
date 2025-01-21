import { ExecutionContext, createParamDecorator } from "@nestjs/common";

import { PayloadTokenDTO } from "./dto/auth.dto";

export const TokenPayload = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user as PayloadTokenDTO;
});
