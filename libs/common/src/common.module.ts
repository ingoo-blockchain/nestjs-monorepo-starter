import { VALIDATION_PIPE_OPTIONS } from '@app/common/constans/validation-pipe-options.constants'
import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'

@Module({
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS),
        },
    ],
})
export class CommonModule {}
