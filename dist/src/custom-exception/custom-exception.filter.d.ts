import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class CustomExceptionFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): void;
}
