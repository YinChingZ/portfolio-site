# 部署：GitHub → Cloudflare Pages（自动）

网站地址：<https://xiaoranhou.com>（`www.xiaoranhou.com` 也能打开）

## 自动部署流程

1. 改动推送到 GitHub 仓库 `YinChingZ/portfolio-site` 的 `main` 分支。
2. Cloudflare Pages 项目 `xiaoran-hou` 收到推送，自动开始构建：
   - 运行 `python3 tools/build_dist.py`，生成 `dist/`
   - 把 `dist/` 发布上线
3. 大约一两分钟后网站就会更新。

部署设置：

| 项目 | 值 |
|---|---|
| Build command | `python3 tools/build_dist.py` |
| Build output directory | `dist` |
| Production branch | `main` |

`dist/` 里只有网站真正用到的文件。PLAN.md、工具脚本、没用到的照片都不会出现在网站上。仓库是私有的，外人看不到这些文件。

## 常见操作

- **看部署状态或回滚**：Cloudflare 控制台 → Workers & Pages → `xiaoran-hou` → Deployments。点旧版本右边的 “…” 菜单，选 Rollback。
- **看不到更新**：用 Cmd + Shift + R 强制刷新。
- **自己在本地改**：改完提交并推送到 `main`，也会自动部署。
  - 想先在本地看效果：先运行 `python3 tools/build_dist.py`，再直接打开 `dist/index.html`。
- **换图或加图**：新照片必须先用 `tools/` 里的脚本处理，会去掉 GPS 和拍摄信息、生成多种尺寸，然后在 `data.js` 里引用。不要把原图直接放进 `assets/`。

## 其他

- 字体在 `assets/fonts/` 里，网站自己提供，不依赖 Google Fonts，国内也能正常显示。
- 国内经常打不开 `xiaoran-hou.pages.dev`，请用 xiaoranhou.com 访问。
- 草稿提示框由 `data.js` 里的 `showDraftNotes` 控制，平时设为 `false`。
