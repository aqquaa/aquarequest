export const Method = Object.freeze({
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
})

export const STATE = Object.freeze({
    busy: false,
    response: null,
    result: null,
    cancelled: false,
    statusCode: null,
    downloadProgress: 0,
    uploadProgress: 0,
})

export const HOOK_NAME = Object.freeze({
    BEFORE: 'onBefore',
    START: 'onStart',
    DOWNLOAD: 'onDownload',
    UPLOAD: 'onUpload',
    CANCEL: 'onCancel',
    STATUS_CODE: 'onStatusCode',
    SUCCESS: 'onSuccess',
    ERROR: 'onError',
    FINISH: 'onFinish'
})

export const PUBLIC_EVENTS = Object.freeze({
    BEFORE: 'aquarequest:onBefore',
    START: 'aquarequest:onStart',
    DOWNLOAD: 'aquarequest:onDownload',
    UPLOAD: 'aquarequest:onUpload',
    CANCEL: 'aquarequest:onCancel',
    SUCCESS: 'aquarequest:onSuccess',
    ERROR: 'aquarequest:onError',
    FINISH: 'aquarequest:onFinish'
})