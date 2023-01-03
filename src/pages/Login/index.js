import { Card, Button, Checkbox, Form, Input } from 'antd'
// import { LockOutlined, UserOutlined } from '@ant-design/icons'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values, values.mobile)
    loginStore.getToken({
      mobile: values.mobile,
      code: values.code
    })

    navigate('/', { replace: true })

  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger={['onBlur', 'onChange']}>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
              { required: true, message: '请输入手机号' }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />

          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
              { required: true, message: '请输入验证码' }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
        {/* <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' },
            {
              pattern: /^[a-zA-Z0-9_]{8,20}$/,
              message: 'Please enter 8-20 chars',
            }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              // {
              //   pattern: /^[A-Z][a-zA-Z0-9-_]{7,19}$/,
              //   message: 'Please enter 8-20 chars',
              // }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form> */}
      </Card>
    </div >
  )
}
export default Login