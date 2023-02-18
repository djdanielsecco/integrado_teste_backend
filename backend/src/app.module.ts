import { JobService } from './job.service';
import { NoAuthController } from './noauth.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from './entities/userSchema';
import { HttpModule, HttpService } from '@nestjs/axios';
// import { UniversityModule } from './university.module';
// import { UserModule } from './user.module';
import { ScheduleModule } from '@nestjs/schedule';
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
    ScheduleModule.forRoot(),
    HttpModule.register({
      timeout: 360000,
      maxRedirects: 1,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    }),
  ],
  controllers: [
    NoAuthController, AppController],
  providers: [
    JobService,
    AppService, UniversityService, University, UsersService, HttpModule,Users],
  // exports: [HttpModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('api');
  }

}
