import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class LoginResponseDto {
    @Expose()
    @IsString()
    accessToken: string = "";
}