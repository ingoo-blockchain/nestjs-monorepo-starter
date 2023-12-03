import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    static dataName: string = 'data'
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (Array.isArray(data)) {
                    const total = data.pop()

                    const record = data[0][0]
                    const fieldName = record.constructor.name ?? 'data'

                    return { total, [fieldName]: data[0] }
                } else {
                    return data
                }
            }),
        )
    }
}
