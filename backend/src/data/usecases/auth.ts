import { authData, authResponse, IAuthUsecase } from "../../domain/usecases/auth";
import { IComparePass } from "../protocols/helpers/encrypter";
import { IJwtToken } from "../protocols/helpers/jwtToken";
import { ILoadByCpf } from "../protocols/repository/loadByCpf";

export class AuthUsecase implements IAuthUsecase {
    constructor(
      private readonly userRepository: ILoadByCpf,
      private readonly encrypter: IComparePass,
      private readonly jwtToken: IJwtToken
    ) {}
  
    public async execute(data: authData): Promise<authResponse> {
      const user = await this.userRepository.loadByCpf(data.cpf);
      if (!user) throw new Error("Usuario não encontrado!");
      const isPasswordValid = await this.encrypter.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) throw new Error("Senha invalida!");
      const token = this.jwtToken.genToken(user);
      return { token, user };
    }
  }