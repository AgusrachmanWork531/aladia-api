import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from "@nestjs/common";
import { MongoServerError } from "mongodb";
import { Response } from "express";

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoServerError, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";

        if (exception.code === 11000) {
            status = HttpStatus.CONFLICT;
            message = "Duplicate key error";
        } else if (exception.code === 121) {
            status = HttpStatus.BAD_REQUEST;
            message = "Document validation failed";
        } else if (exception.code === 2) {
            status = HttpStatus.NOT_FOUND;
            message = "Namespace not found";
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message
        });
    }
}


