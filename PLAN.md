# 作品集网站 · 交接说明（给 Opus）· v4

Xiaoran Hou 的美国本科艺术申请作品集网站，系列名 **Please Don’t Lick the Art**。v4：作者的文字修改已写入，字体已自托管，可以直接部署（步骤见 **DEPLOY.md**）。剩下的是 About 自述。

## 1. 结构

纯静态站，无需构建。

```
portfolio-site/
  index.html          页面骨架
  fonts.css           自托管字体（assets/fonts/*.woff2，拉丁子集，不依赖 Google Fonts）
  favicon.svg         网页图标（一枚珠针）
  styles.css          站点样式（文件头注释写明版式）
  pop-title.css/.js   立体标题组件：3 种效果 × 6 套配色
  app.js              渲染、作品详情、Process 分组、灯箱、键盘操作
  data.js             ← 所有内容都在这里改
  assets/works/       9 件成品：<slug>-600/1000/1600/2400.webp（Within Sweet Reach 最大 1512）
  assets/process/     各作品的过程图：<slug>-p<n>-600/1600.webp
  assets/more/        Process 区三组照片：test- / outtakes- / bts-<nn>-600/1600.webp，联系表用的方形小图 -sq.webp（240px）
  tools/build_images.py   成品图 + 各作品过程图（去 EXIF/GPS，多尺寸 WebP）
  tools/build_more.py     Process 区三组照片
  tools/build_squares.py  从 -1600.webp 裁出联系表方形小图 -sq.webp（换图后重跑）
  tools/build_preview.py  打包成单页，用于 Claude 预览
  tools/build_fonts.py    从 Google Fonts 仓库的 ttf 生成 assets/fonts/*.woff2
  tools/build_dist.py     生成 dist/：只含上线需要的文件 → 上传到 Cloudflare Pages
  dist/               上传用的文件夹（每次修改后用 build_dist.py 重新生成，不要手改）
  DEPLOY.md           Cloudflare Pages 部署与更新步骤
  titles/             标题效果选择页（3×6 组合）
  directions2/        方向探索页（存档）
  TEXT_NOTES.md       作品描述的修改记录
```

## 2. 页面层级（保持简洁）

整页是**一块连续的底色**，没有硬色块分区；滚到不同区域时底色慢慢过渡（标题+作品 → Process → About，每套配色各有三种很淡的色调，见 app.js 的 `TONES`）。
1. **首屏**：立体标题 → 一张用珠针钉住的 “DO NOT LICK” 贴纸标签（署名、作品数量、引用 Candybound 原句）；宽屏时贴纸右边有一支手绘红箭头 “Look, don’t lick” 指向作品。首屏底部已经露出第一排作品。
   - 进场顺序：标题字母逐个弹出 → 贴纸“啪”地贴上、珠针扎下 → 作品一张张被钉到板上（进入视野时逐排、从左到右）。减弱动效或没有 JS 时全部直接显示。
2. **Works**：紧接着贴纸，九件作品像标本一样用珠针钉在同一块底色上（3 列，最宽 1060px）。作品名用 Bagel Fat One（和标题区、Process 标题同一套圆胖字）。鼠标经过某件时它绕针轻晃，其他作品稍微变淡（聚焦）。
3. **作品详情**：点开后全屏，左边大图（点击看 2400px 原图），右边是标题、年份/媒介/尺寸、材料标签、作者原文（按原文分段）、过程图条、下一件。支持 ← → 和 Esc，网址带 `#slug`，可以直接分享某一件。
4. **Process**：作者要求视觉权重要轻、单张图要小、和主作品明显区分。所以三组各做成一张**用珠针钉住的小联系表**（白纸卡 + 方形小图网格，三张并排；手机上竖排），每张小图约 75–85px，远小于作品。
   - Test shoots（家里 Canon IXUS 115 HS 试拍，12 张；她自己拼的联系表和 5 张较弱的试拍已撤下，原文件不动）
   - Studio outtakes（棚拍中没写成作品的画面，12 张）
   - Behind the scenes（花絮，15 张）
   点任一小图在灯箱里看（灯箱也比作品小一号，白边装裱）；有关联作品的会显示 “Related work: 作品名 →”，点了直接打开那件作品。列数按张数自动算，尽量三行。
5. **About**：自述（待补）+ 邮箱。
6. 以后要加 **Research** 之类的独立板块：在 `data.js` 的 `sections` 里加一个对象 `{ id, label, intro, items }`，导航和页面会自动出现，图片用小尺寸瀑布流（styles.css 的 `.masonry`，4 列）。

## 3. 标题

`data.js` 里 `title: { effect: "A", palette: 4, outline: false, side: "#F6A9C9" }`。`side` 是立体厚度的颜色（原来是樱桃红，作者要求改淡绿/淡粉；对比图里 A 淡粉 #F6A9C9、B 粉 #F28DB8、C 淡绿 #A8E6C1、D 薄荷绿 #7ED6A6，默认 A）。作者要求：底色要淡、不能抢作品颜色；标题不要深色描边（`outline: false`，即 pop-title.css 的 `.pt-soft`）。效果 A 波普立体 / B 网点波普 / C 复古贴纸；配色 1 泡泡糖 / 2 樱桃薄荷 / 3 复古圣代 / 4 蓝莓汽水 / 5 薄荷巧克力 / 6 葡萄之夜。改这两个值即可，首屏、Process 底色、About 底色会一起变。
- 纯 CSS 实现（字体 Rubik 900 斜体；C 用 Oleo Script Bold），所有浏览器都清晰。
- 字母逐个弹出；鼠标经过某个字母会被“按”下去（手机上轻点）。

## 4. 待作者确认

- [x] 标题：作者选了 **A4**（波普立体 + 蓝莓汽水配色：柠檬黄字面，淡天蓝底），无描边
- [ ] 标题厚度颜色：淡粉 / 粉 / 淡绿 / 薄荷绿 四选一（data.js `title.side`）
- [ ] Process 总说明 `processIntro`（草稿）
- [x] 作品描述：作者 10/13 标注的修改已写入，10/14 改完剩余语法、Charles Spence、统一美式拼写和时态（见 TEXT_NOTES.md）
- [ ] 材料清单（data.js 每件作品的 `materials`，从描述里整理）
- [ ] Process 区三组的英文说明（`intro`，草稿）
- [ ] “→ 作品名” 的关联是我根据画面判断的，需核对
- [ ] About 自述（约 100 词英文）
- [x] `showDraftNotes: false`（虚线草稿提示已隐藏）
- [ ] 绑定域名后把 index.html 的 `og:image` 改成完整网址

## 5. 隐私

- 原图含 GPS 定位，网页图片已全部去掉元数据；不要上传原图。
- 试拍里有三组药盒/药板/贴创可贴手臂的照片，药名清晰可见，**没有放上网站**。

## 6. 下一步（Opus）

1. 标题已设为 A4；如作者再换，只改 `data.js` 的 `title`。
2. ~~字体自托管~~（已完成：fonts.css + assets/fonts/）。
3. ~~favicon 和分享图~~（已完成；`og:image` 等域名确定后改绝对地址）。
4. 部署：作者用 Cloudflare Pages 的拖拽上传（Direct Upload），每次上传 `dist/`。详见 DEPLOY.md。改完任何内容都要先跑 `python3 tools/build_dist.py`。
5. 检查：Lighthouse、iPhone 宽度、键盘、减弱动效。
6. 没用到的图（`assets/more/test-01/11/12/13/17/18-*` 等）留在文件夹里也没关系，`build_dist.py` 不会把它们放进 `dist/`。
