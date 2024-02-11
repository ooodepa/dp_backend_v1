export default function getStatusByStatusCode(code: number) {
  const HTTP_STATUS_CODES = {
    100: 'Continue',
    101: 'Switching_Protocols',
    102: 'Processing',
    103: 'Early_Hints',
    200: 'Ok',
    201: 'Created',
    202: 'Accepted',
    203: 'Non_Authoritative_Information',
    204: 'No_Content',
    205: 'Reset_Content',
    206: 'Partial_Content',
    300: 'Ambiguous',
    301: 'Moved_Permanently',
    302: 'Found',
    303: 'See_Other',
    304: 'Not_Modified',
    307: 'Temporary_Redirect',
    308: 'Permanent_Redirect',
    400: 'Bad_Request',
    401: 'Unauthorized',
    402: 'Payment_Required',
    403: 'Forbidden',
    404: 'Not_Found',
    405: 'Method_Not_Allowed',
    406: 'Not_Acceptable',
    407: 'Proxy_Authentication_Required',
    408: 'Request_Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length_Required',
    412: 'Precondition_Failed',
    413: 'Payload_Too_Large',
    414: 'Uri_Too_Long',
    415: 'Unsupported_Media_Type',
    416: 'Requested_Range_Not_Satisfiable',
    417: 'Expectation_Failed',
    418: 'I_Am_A_Teapot',
    421: 'Misdirected',
    422: 'Unprocessable_Entity',
    424: 'Failed_Dependency',
    428: 'Precondition_Required',
    429: 'Too_Many_Requests',
    500: 'Internal_Server_Error',
    501: 'Not_Implemented',
    502: 'Bad_Gateway',
    503: 'Service_Unavailable',
    504: 'Gateway_Timeout',
    505: 'Http_Version_Not_Supported',
  };

  const statusText = HTTP_STATUS_CODES[code];
  return statusText || '';
}
