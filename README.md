# 源师云课 · 智慧云课堂平台

技术栈（Vite）：

- React 18 + TypeScript
- React Router v6
- Ant Design 5
- ECharts（`echarts-for-react`）
- Axios
- TailwindCSS
- Vite
- 状态管理：轻量 `useState` / `useContext`（当前初始化以本地状态为主）

## 启动

```bash
npm install
npm run dev
```

## 品牌色

- 主色（青蓝）：`#2996FF`
- 辅色（浅绿）：`#6EE7A4`
- 常量定义：`src/config/brand.ts`

## 目录结构（按规范）

```text
src
├─ assets
│  ├─ images                        # 图片静态资源
│  └─ styles                        # 全局样式
├─ config
│  └─ brand.ts                      # 品牌名与色值
├─ components
│  ├─ PageCard                      # 页面通用卡片
│  ├─ EchartBox                     # ECharts 通用容器
│  ├─ ClassQAPanel                  # 数字人课堂问答
│  └─ DigitalHumanPlayer            # 数字人播放器通用组件
├─ pages
│  ├─ official                      # 官网业务页
│  ├─ student                       # 学生端业务页
│  ├─ teacher                       # 教师端业务页
│  └─ admin                         # 管理端业务页
├─ router
│  ├─ groups                        # 宣传/学生/教师/管理员四组路由
│  ├─ RootLayout.tsx
│  └─ index.tsx
├─ api
│  ├─ http.ts                       # axios + mock adapter
│  ├─ mockData.ts                   # 业务 mock 数据
│  ├─ digitalClassApi.ts            # 数字人课堂 API
│  └─ platformApi.ts                # 业务接口封装
└─ utils
   └─ mockStreamText.ts              # 流式输出 mock
```

## 已初始化内容

- 品牌名：**源师云课**（左上角渐变 Logo）
- 已接入业务 mock 数据：师资 66.7% 短缺、CPR 18.1%、AED 4.3%、1000+ 课程/5000+ 题库、550 万行业人才缺口
- 已完成 4 组路由分流：宣传路由 / 学生路由 / 教师路由 / 管理员路由
- 已配置全局主题色：主色 `#2996FF`、辅色 `#6EE7A4`

详细变更记录见 `docs/开发交接文档.md` §11。
