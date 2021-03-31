import * as path from 'path';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BroadcastModule } from './broadcast/broadcast.module';
import { TestCallModule } from './test-call/test-call.module';
import { CallModule } from './call/call.module';
import { NumbersModule } from './numbers/numbers.module';
import { LoginModule } from './login/login.module';
import configuration from './config/configuration';

/**
 * Common modules
 */
@Module({})
export class SharedModule {
  static forRoot(isProduction: boolean): DynamicModule {
    const imports = [
      ConfigModule.forRoot({
        envFilePath: path.resolve(process.cwd(), '../.env'),
        isGlobal: true,
        load: [configuration],
      }),
      BroadcastModule,
      TestCallModule,
      CallModule,
      NumbersModule,
      LoginModule,
    ];

    if (isProduction) {
      imports.push(
        ServeStaticModule.forRoot({
          rootPath: path.resolve(process.cwd(), '../build'),
        }),
      );
    }

    return {
      module: SharedModule,
      imports,
    };
  }
}
