import { Row, Col, Card, Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoImg } from './utils/Tool';

function Login() {
  const navigate = useNavigate();
  return (
    <Row>
      <Col
        md={{
          span: 8,
          push: 8,
        }}
        xs={{
          span: 22,
          push: 1,
        }}
      >
        <img
          src={LogoImg}
          style={{
            display: 'block',
            margin: '20px auto',
            borderRadius: '16px',
            width: '200px',
          }}
        />
        <Card title='Java-Based Microservice Development Scaffolding'>
          <Form
            labelCol={{
              md: {
                span: 5,
              },
            }}
            onFinish={async (v) => {
              console.log(v)
              message.success('Login Success')
              navigate('/admin/user')
            }}
          >
            <Form.Item
              label='username'
              name='userName'
              rules={[
                {
                  required: true,
                  message: 'please input your username',
                },
              ]}
            >
              <Input placeholder='please input your username' />
            </Form.Item>
            <Form.Item
              label='password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'please input your password',
                },
              ]}
            >
              <Input.Password placeholder='please input your password' />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
                style={{
                  display: 'block',
                  margin: '8px auto',
                  width: '20vw',
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
