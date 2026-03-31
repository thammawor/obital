# 🌟 占星博客 AstroBlog

一个使用 Svelte 5 和 SvelteKit 构建的深度占星学研究与计算平台。

## ✨ 功能特色

### 博客系统
- 📝 精美的博客文章展示
- 🏷️ 文章分类和标签系统
- ⏱️ 阅读时间估算
- 🔍 文章搜索和筛选

### 占星计算功能

#### 1. 出生星盘计算 (Birth Chart)
- 精确计算太阳、月亮和所有行星的位置
- 支持十二星座定位
- 十二宫位系统（Placidus）
- 上升星座和中天计算
- 详细的相位分析（合相、六分相、四分相、三分相、对分相等）
- 中文星盘解读

#### 2. 行星位置计算
包括以下天体：
- ☉ 太阳 (Sun)
- ☽ 月亮 (Moon)
- ☿ 水星 (Mercury)
- ♀ 金星 (Venus)
- ♂ 火星 (Mars)
- ♃ 木星 (Jupiter)
- ♄ 土星 (Saturn)
- ♅ 天王星 (Uranus)
- ♆ 海王星 (Neptune)
- ♇ 冥王星 (Pluto)
- ⚷ 凯龙星 (Chiron)
- ☊ 北交点 (North Node)
- ☋ 南交点 (South Node)
- ⚸ 莉莉丝 (Lilith)

#### 3. 相位分析
支持以下相位类型：
- 合相 (Conjunction) 0°
- 六分相 (Sextile) 60°
- 四分相 (Square) 90°
- 三分相 (Trine) 120°
- 对分相 (Opposition) 180°
- 梅花相 (Quincunx) 150°
- 十二分相 (Semisextile) 30°
- 八分相 (Semisquare) 45°
- 三分半相 (Sesquiquadrate) 135°

#### 4. 月相计算
- 新月、满月等八个阶段
- 月亮照明度百分比
- 下一个阶段预测

## 🛠️ 技术栈

- **框架**: SvelteKit 2.x
- **UI 库**: Svelte 5 (使用 Runes 语法)
- **语言**: TypeScript
- **样式**: CSS Modules
- **计算算法**: 基于 VSOP87 理论的简化天文算法

## 📁 项目结构

```
my-app/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── blog/          # 博客组件
│   │   │   └── astrology/     # 占星组件
│   │   ├── stores/
│   │   │   └── blog.ts        # 博客状态管理
│   │   ├── types/
│   │   │   └── astrology.ts   # TypeScript 类型定义
│   │   └── utils/
│   │       └── astrologyCalculations.ts  # 占星计算核心逻辑
│   └── routes/
│       ├── +layout.svelte     # 全局布局
│       ├── +page.svelte       # 首页
│       ├── blog/
│       │   ├── +page.svelte   # 博客列表
│       │   └── [slug]/
│       │       └── +page.svelte  # 文章详情
│       └── astrology/
│           ├── birth-chart/   # 出生星盘计算
│           ├── transits/      # 流年运势（待开发）
│           └── synastry/      # 合盘分析（待开发）
└── static/
```

## 🚀 快速开始

### 安装依赖

```bash
cd my-app
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📖 使用方法

### 计算出生星盘

1. 导航到「占星计算」>「出生星盘」
2. 输入出生日期（年月日）
3. 输入出生时间（尽量精确）
4. 输入出生地点的纬度和经度
5. 选择时区
6. 点击「计算星盘」按钮

系统将显示：
- 星盘概览（太阳、月亮、上升星座）
- 所有行星的详细位置
- 十二宫位分布
- 行星之间的相位关系
- 可选的详细解读

### 阅读博客文章

1. 导航到「博客文章」页面
2. 可以按分类筛选文章
3. 点击文章标题阅读详细内容
4. 文章包含丰富的占星学知识

## 🔮 计算精度说明

本应用使用简化的天文算法，适合：
- 占星学学习和研究
- 一般性的星盘解读
- 教育目的

对于专业占星咨询，建议使用专业的占星软件如：
- Solar Fire
- AstrolDeluxe
- Swiss Ephemeris

## 🌐 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📝 许可证

MIT License

## 🙏 致谢

感谢 Svelte 团队提供的优秀框架，以及所有为占星学研究做出贡献的先贤。

---

**注意**: 占星学仅供娱乐和教育目的，不应作为重大人生决策的唯一依据。
