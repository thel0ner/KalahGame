import { iif, interval, Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { JWTService } from "../../services/jwt.service";
import { JWTBaseStructure } from "../../types/jwt-base-structure.type";
import { SignInResponseDTO } from "../../types/sign-in-response-dto.type";

export abstract class TokenControl {
    private issuedAt!: number;
    private expireTime!: number;
    protected accessToken!: string;
    protected refreshToken!:string;
    constructor(
        protected jwtService: JWTService,
    ) { }

    private parseJWT(token: string): JWTBaseStructure {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(
            (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
    }

    protected getToken() {
        const temp: SignInResponseDTO = <SignInResponseDTO>this.jwtService.getInfo();
        this.accessToken = temp.accessToken;
        this.refreshToken = temp.refreshToken;
        const parsedToken: JWTBaseStructure = this.parseJWT(this.accessToken);
        this.issuedAt = parsedToken.iat * 1000;
        this.expireTime = parsedToken.exp * 1000;
    }

    protected monitorTiming$():Observable<boolean>{
        return interval(1000).pipe(
            map(_ => Date.now()),
            map(currentTime => (this.expireTime - currentTime) <= 60000),
            filter(shouldAsk => shouldAsk === true),
        );
    }
}