import React from "react";
import  { LOGIN,LOGINout,SEND,ON } from "./IM/UserSig"
import {Form,Input,Checkbox,Button} from "antd"
import "./App.css";
class App extends React.Component{
    constructor() {
        super();
        this.state={
            send:'123'
        }
    }
    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
     tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
   onFinish = (values) => {
       LOGIN(values)
    };

   onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
   Send=()=>{
       SEND(this.state.send)
   }
    CHSend=(e)=>{
        this.setState({
            send:e.target.value
        })
    }

    componentDidMount() {
        ON()
    }

    render() {
        return (
            <>
                <div className="App">
                <Form
                    {...this.layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...this.tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </div>
                <div>
                    <Input  placeholder="发送消息"   onChange={(e)=>{this.CHSend(e)}} />
                    <Button onClick={(e)=>{this.Send(e)}  }>发送</Button>
                </div>
            </>
        )
    }
}
export default  App

