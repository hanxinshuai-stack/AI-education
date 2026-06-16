import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Segmented, Typography, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginDemo } from "@/api/authApi";
import { BRAND_NAME } from "@/config/brand";
import { ROLE_HOME } from "@/config/auth";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";

interface LoginFormValues {
  username: string;
  password: string;
  role: UserRole;
}

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, login } = useAuth();
  const [form] = Form.useForm<LoginFormValues>();

  const defaultRole: UserRole = searchParams.get("role") === "admin" ? "admin" : "student";

  useEffect(() => {
    form.setFieldValue("role", defaultRole);
  }, [defaultRole, form]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    navigate(ROLE_HOME[user.role], { replace: true });
  }, [isAuthenticated, user, navigate]);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const authUser = await loginDemo(values, values.role);
      login(authUser);
      message.success(
        values.role === "admin" ? "登录成功，欢迎进入管理端！" : "登录成功，欢迎回来！"
      );
      navigate(ROLE_HOME[values.role]);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e] px-4">
      <Card className="w-full max-w-md shadow-2xl" style={{ background: "#1f2333", borderColor: "#2a2f45" }}>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#2996FF] to-[#6EE7A4]">
            <span className="text-2xl font-bold text-white">源</span>
          </div>
          <Typography.Title level={3} className="!mb-1 !text-white">
            登录 {BRAND_NAME}
          </Typography.Title>
          <Typography.Text className="text-[#8a93a8]">选择身份后登录进入对应端</Typography.Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
          initialValues={{ role: defaultRole }}
        >
          <Form.Item name="role" className="!mb-6">
            <Segmented
              block
              options={[
                { label: "学生身份", value: "student" },
                { label: "管理员身份", value: "admin" },
              ]}
            />
          </Form.Item>

          <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名 / 手机号 / 邮箱" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} className="h-11 text-base">
              立即登录
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 border-t border-[#2a2f45] pt-4 text-center text-xs text-[#5a6378]">
          演示模式：选择身份后，输入任意用户名和密码即可登录
        </div>
      </Card>
    </div>
  );
}
