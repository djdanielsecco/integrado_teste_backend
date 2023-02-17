import { NoAuthController } from './noauth.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from './entities/userSchema';
// import { UniversityModule } from './university.module';
// import { UserModule } from './user.module';
import { ConfigModule } from './config/config.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityService } from './university.service';
import { University, UniversitySchema } from './entities/UniversitySchema';
import { AuthMiddleware } from './auth.middleware';
@Module({
  imports: [
    University,
    Users,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),

    ConfigModule,
    MongooseModule.forFeature([{ name: University.name, schema: UniversitySchema }, { name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [
    NoAuthController, AppController],
  providers: [
    AppService, UniversityService, University, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('api');
  }

}
