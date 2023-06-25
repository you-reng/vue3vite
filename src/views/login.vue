<template>
	<div class="login">
		<div class="left">
			<img class="background" src="./images/img_bgFx.png" />
		</div>
		<div class="login-page">
			<div>
				<div class="header">
					<img src="./images/logo_gs.png" alt />
				</div>
				<div class="main">
					<div class="content">
						<div class="title">Welcome Back！</div>
						<input class="input" type="text" oninput="this.value=this.value.replace(/\s+/g,'')"
							v-model="params.username" placeholder="请输入登录账号" />
						<input type="text" style="display: none" />
						<div class="show_pass">
							<input class="input" oninput="this.value=this.value.replace(/\s+/g,'')" type="text"
								placeholder="请输入登录密码" v-if="pwdType" v-model="params.pwd" />
							<input class="input" oninput="this.value=this.value.replace(/\s+/g,'')" type="password"
								placeholder="请输入登录密码" v-model="params.pwd" v-else />
							<div class="show_img">
								<img v-if="seen" src="../assets/images/login_icon_eye_@2x.png" @click="changeType()"
									class="eye_img" />
								<img v-else src="../assets/images/login_icon_eye_close@2x.png" @click="changeType()"
									class="eye_img" />
							</div>
						</div>
						<el-checkbox class="remember-code" v-model="checkedLogin">记住密码</el-checkbox>
						<div class="submit" @click="handleLodin">登录</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script >
import { postLogin } from "../api/index";
import { encryptByDES, decryptByDES } from '../utils/3DES'
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { usePermissStore } from '../store/permiss';
export default defineComponent({
	name: 'login',
	props: {},
	emits: [],
	setup(props, context) {
		const seen = ref("")
		const isLoading = ref(false)
		const pwdType = ref(false)
		const checkedLogin = ref(false)
		const router = useRouter();
		const params = reactive({
			username: '',
			pwd: ''
		})
		onMounted(() => {
			if (JSON.parse(localStorage.getItem('loginUser'))) {
				params.username = JSON.parse(localStorage.getItem('loginUser')).username
				params.pwd = decryptByDES(JSON.parse(localStorage.getItem('loginUser')).pwd, '63e42c2444e94c1ebca21d30d2aa39a5')
				checkedLogin.value = JSON.parse(localStorage.getItem('loginUser')).checkedLogin
				window.addEventListener('keydown', keyDown);
			}
		})
		const changeType = () => {
			seen.value = !seen.value;//小眼睛的变化
			pwdType.value = !pwdType.value;//跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
		}
		const keyDown = (e) => {
			//如果是回车则执行登录方法
			if (e.keyCode == 13) {
				handleLodin();
			}
		}
		const permiss = usePermissStore();
		const handleLodin = () => {
			if (!params.username || !params.pwd) {
				return ElMessage.error('请输入登录账号或密码')
			}
			const pcLoginRequest = {
				pageNum: 0,
				pageSize: 0,
				userName: params.username,
				password: params.pwd,
				token: ""
			};
			if (params.username !== "" && params.pwd !== "") {
				localStorage.setItem('ms_username', params.username);
			const keys = permiss.defaultList[params.username == 'admin' ? 'admin' : 'user'];
			permiss.handleSet(keys);
			localStorage.setItem('ms_keys', JSON.stringify(keys));
				postLogin(pcLoginRequest).then(res => {
					//请求返回来的数据
					console.log(res,"hsjkhdfghg");
					//  保存token：
					if (res.code === 1) {
						localStorage.setItem("token", res.data.token);
						localStorage.setItem("userImg", res.data.user.userImg);
						localStorage.setItem("userName", res.data.user.userName);
						if (checkedLogin.value) {
							let userForm = params
							userForm.checkedLogin = checkedLogin.value
							userForm.pwd = encryptByDES(userForm.pwd, '63e42c2444e94c1ebca21d30d2aa39a5')
							localStorage.setItem('loginUser', JSON.stringify(userForm))
						} else {
							localStorage.removeItem('loginUser')
						}
						router.push({ path: "/" });
						ElMessage({
							message: '登录成功',
							type: 'success',
						})
					} else {
						ElMessage.error(res.msg)
					}
				}).catch(err => {
					console.log(err.msg);
				});
			}
		}

		return {
			changeType,
			keyDown,
			handleLodin,
			seen,
			isLoading,
			pwdType,
			checkedLogin,
			params,

		}
	},
	components: {},
})
</script>
<style lang="scss" scoped>
.login {
	width: 100%;
	height: 100vh;
	background: #ffffff;
	min-height: 700px;
	display: flex;
	align-items: center;
	overflow: hidden;

	.left {
		// width: 50%;
		// height: 100vh;
	}

	.background {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.login-page {
		background: url("./images/img_bg2.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 50%;
		flex: 1;
		height: 100%;
		// position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;

		.header {
			// position: absolute;
			background-color: transparent;
			right: 300px;
			top: 80px;
			display: flex;
			align-items: center;

			>img {
				width: 484;
				height: 61px;
				margin-bottom: 40px;
			}

			>span {
				font-size: 30px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #0981ff;
			}
		}

		.main {
			// position: absolute;
			width: 560px;
			height: 620px;
			background: #0981ff;
			box-shadow: 0px 5px 96px 0px rgba(78, 130, 185, 0.1),
				0px 30px 70px 0px rgba(78, 130, 185, 0.27);
			border-radius: 20px;
			padding: 8px 0 0 0;

			.content {
				overflow: visible;
				width: 560px;
				height: 612px;
				background: #ffffff;
				border-radius: 20px;
				padding: 50px 50px 0px 50px;

				.title {
					font-size: 46px;
					font-family: PingFang SC;
					// font-weight: bold;
					color: #333333;
					margin-bottom: 40px;
				}

				.title2 {
					font-size: 30px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}

				.input {
					display: block;
					width: 100%;
					border: none;
					border-bottom: 1px solid #e7eaee;
					padding: 40px 0;
					font-size: 20px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					outline: none;

					&::placeholder {
						font-size: 20px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #b6b9d0;
						outline: none;
					}
				}

				.remember-code {
					margin: 20px 0 53px 0;
				}

				.remember-forget {
					margin: 20px 0 53px 0;
					float: right;
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					text-decoration: underline;
					color: #0981FF;
					cursor: pointer;
				}

				.submit {
					width: 460px;
					height: 60px;
					background: #0981ff;
					border-radius: 10px;
					font-size: 24px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 34px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
			}
		}

		.footer {
			position: absolute;
			left: 52px;
			bottom: 39px;
			font-size: 30px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #0981ff;
		}
	}

	.show_pass {
		position: relative;

		.show_img {
			position: absolute;
			top: 40%;
			right: 5px;
			width: 25px;
			height: 25px;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
  

<!-- <script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';

interface LoginInfo {
	username: string;
	password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
	username: 'admin',
	password: '123123'
});

const rules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid: boolean) => {
		if (valid) {
			ElMessage.success('登录成功');
			localStorage.setItem('ms_username', param.username);
			const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
			permiss.handleSet(keys);
			localStorage.setItem('ms_keys', JSON.stringify(keys));
			router.push('/');
		} else {
			ElMessage.error('登录成功');
			return false;
		}
	});
};

const tags = useTagsStore();
tags.clearTags();
</script> -->
