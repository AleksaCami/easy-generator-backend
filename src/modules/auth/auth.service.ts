import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { LoggerService } from '../logger/logger.service';
import { SignInDto } from './dto/sign-in.request.dto';
import { SignUpDto } from './dto/sign-up.request.dto';
import { User } from './schema/user.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(LoggerService)
    private logger: LoggerService
  ) { }

  /**
    * Registers a new user by hashing the password and saving the user to the database.
    * A JWT token is generated for the user upon successful registration.
    * 
    * @param params - The sign-up data containing email, name, and password.
    * @returns An object containing the generated JWT token.
  */
  async signUp(params: SignUpDto): Promise<{ user: User, token: string }> {
    const { email, name, password } = params;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.warn(`User with email ${email} already exists.`);
      throw new ConflictException('Email already in use');
    }

    this.logger.info(`Attempting to sign up user with email: ${email}`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ email, name, password: hashedPassword });
    await user.save();

    this.logger.info(`User with email: ${email} successfully registered`);

    const token = this.jwtService.sign({ id: user._id });

    this.logger.info(`JWT token generated for user with email: ${email}`);

    return { token, user };
  }

  /**
   * Authenticates a user by verifying the credentials. If valid, a JWT token is generated.
   * 
   * @param params - The sign-in data containing email and password.
   * @returns An object containing the generated JWT token.
   * @throws UnauthorizedException - If the user credentials are invalid.
   */
  async signIn(params: SignInDto): Promise<{ token: string }> {
    const { email, password } = params;

    this.logger.info(`Attempting to sign in user with email: ${email}`);

    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.warn(`Failed sign-in attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.info(`User with email: ${email} successfully signed in`);

    const token = this.jwtService.sign({ id: user._id });

    this.logger.info(`JWT token generated for user with email: ${email}`);

    return { token };
  }
}
