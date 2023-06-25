import request from '../utils/request';

export const postLogin = (params:any) => {
    return request({
        method: 'POST',
        url: '/login-center/store/pc/login',
        data: params
    })
};
