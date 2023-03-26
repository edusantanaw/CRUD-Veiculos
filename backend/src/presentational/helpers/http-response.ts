type httpResponse = {
  statusCode: number;
  body: any;
};

function badRequest<T>(data: T): httpResponse {
  return {
    statusCode: 400,
    body: data,
  };
}

function created<T>(data: T): httpResponse {
  return {
    statusCode: 201,
    body: data,
  };
}

function success<T>(data: T): httpResponse {
  return {
    statusCode: 200,
    body: data,
  };
}

function server(err: Error): httpResponse {
  return {
    statusCode: 500,
    body: err.message,
  };
}

function noContent<T>(data: any): httpResponse {
  return {
    statusCode: 204,
    body: data,
  };
}

function error(data: Error): httpResponse {
  return {
    statusCode: 400,
    body: data.message,
  };
}

export { error, created, badRequest, httpResponse, success, noContent, server };
