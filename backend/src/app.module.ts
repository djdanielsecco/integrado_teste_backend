import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AuthMiddleware } from './auth.middleware';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { University, UniversitySchema } from './entities/UniversitySchema';
import { Users, UsersSchema } from './entities/UsersSchema';
import { JobService } from './job.task';
import { NoAuthController } from './noauth.controller';
import { UniversityService } from './university.service';
import { UsersService } from './users.service';
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
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: University.name, schema: UniversitySchema },
    ]),
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
  controllers: [NoAuthController, AppController],
  providers: [
    JobService,
    University,
    UniversityService,
    UsersService,
    HttpModule,
  ],
  exports: [
    JobService,
    University,
    UniversityService,
    UsersService,
    HttpModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api');
  }
}
