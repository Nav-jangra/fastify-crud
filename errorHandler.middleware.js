export default function errorHandler(error, request, reply) {
    request.log.error(error);
  
    let statusCode = error.statusCode || 500;
    let response = {
      success: false,
      message: error.message || 'Internal Server Error',
      code: error.code || 'INTERNAL_ERROR',
    };
    reply.status(statusCode).send(response);
  }
  