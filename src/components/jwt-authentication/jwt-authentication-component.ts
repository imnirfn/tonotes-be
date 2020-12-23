import {registerAuthenticationStrategy} from '@loopback/authentication';
import {
  Application,
  Binding,
  Component,
  CoreBindings,
  inject,
} from '@loopback/core';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  TokenServiceConstants,
  UserServiceBindings,
} from './keys';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {JWTAuthenticationStrategy} from './services/jwt.auth.strategy';
import {JWTService} from './services/jwt.service';
import {MyUserService} from './services/user.service';

export class JWTAuthenticationComponent implements Component {
  bindings: Binding[] = [
    Binding.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    ),
    Binding.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    ),
    Binding.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService),
    Binding.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService),
    Binding.bind(PasswordHasherBindings.ROUNDS).to(10),
    Binding.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher),
  ];

  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    registerAuthenticationStrategy(app, JWTAuthenticationStrategy);
  }
}
