import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import environments from '../config/url'
import { encryptByDES, decryptByDES } from '../utils/3DES'
import { ElMessage ,ElMessageBox } from 'element-plus'
import {
	deleteUserInfo,
	setSessionStorage
} from '../utils/storage'
import router from '../router/index'
const service:AxiosInstance = axios.create({
    baseURL:environments[import.meta.env.VITE_BASE_URL].baseURL,
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // const token = localStorage.getItem('token');
        // if(token){
        //     let TOKEN = encryptByDES(encryptByDES((new Date().getTime()).toString(),'63e42c2444e94c1ebca21d30d2aa39a5'),token)
        //     config.headers.TOKEN = TOKEN;
        // }
        config.headers.ACCESS_TOKEN = null;
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.code === 1 || response.data.size) {
			return response.data
		} else {
			ElMessage.error(response.data.msg)
			return Promise.reject(response.data)
		}
    },
    (error: AxiosError) => {
        if (!error.response) {
			ElMessageBox.alert(error.message, '错误提示', {
				type: 'error'
			})
		}
		if (error.code === 'ECONNABORTED') {
			ElMessageBox.alert('数据请求超时，请重新请求', '错误提示', {
					type: 'error'
				})
				.then(() => {
					return service(error.config)
				})
		} else {
			if (error.response.status === 401) {
				if (router.currentRoute.fullPath !== '/login') {
					console.log(router.currentRoute.fullPath)
					setSessionStorage(router.currentRoute.fullPath)
					deleteUserInfo()
				}
				router.replace('/login')
			} else if (error.response.status === 400) {
				ElMessageBox.alert(error.response.data, '错误提示', {
					type: 'error'
				})
			} else{
				ElMessageBox.alert(error.response.status + '服务繁忙', '错误提示', {
					type: 'error'
				})
				console.log(error.response.data)
			}
		}
		return Promise.reject(error)
    }
);

export default service;
