const CONFIG = {
  // 背景图：本地图片写 "images/bg.jpg"，网络图片写完整网址
  // 留空字符串 "" 则显示默认深色背景
  background: "a.png",

  // 页面标题 / 副标题
  title: "一个导航",
  subtitle: "一个小小的尝试",

  // 是否在新标签页打开链接
  openInNewTab: true,

  // 卡片列表（想加多少加多少）
  links: [
    { icon: "🔍", title: "个人简介", desc: "一个尝试", url: "https://deletes12.github.io/a.html" },
    { icon: "📺", title: "小破站", desc: "哔哩哔哩",         url: "https://www.bilibili.com" },
    { icon: "🐙", title: "敲敲更头秃", desc: "GitHub",           url: "https://github.com" },
    { icon: "📚", title: "题海淹没中", desc: "洛谷",         url: "https://www.luogu.com.cn/" }
  ]
};

/* ============================================================
   ② 渲染逻辑：一般不需要改动
   ============================================================ */
(function () {
  const root = document.documentElement;

  /* ---- 背景图：先预加载，加载成功后再显示，避免闪白 ---- */
  if (CONFIG.background) {
    const img = new Image();
    img.onload = () => root.style.setProperty("--bg-image", `url("${CONFIG.background}")`);
    img.onerror = () => console.warn("[导航页] 背景图片加载失败：", CONFIG.background);
    img.src = CONFIG.background;
  }

  /* ---- 标题 ---- */
  document.title = CONFIG.title || "导航页";
  document.getElementById("page-title").textContent = CONFIG.title || "";
  document.getElementById("page-subtitle").textContent = CONFIG.subtitle || "";

  /* ---- 卡片 ---- */
  const wrap = document.getElementById("cards");
  const frag = document.createDocumentFragment();

  (CONFIG.links || []).forEach((item, i) => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = item.url;
    a.target = CONFIG.openInNewTab ? "_blank" : "_self";
    if (CONFIG.openInNewTab) a.rel = "noopener noreferrer";
    a.style.animationDelay = (0.08 * i).toFixed(2) + "s";   // 依次出现

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = item.icon || "🔗";

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = item.title || "未命名";

    a.append(icon, title);

    if (item.desc) {
      const desc = document.createElement("span");
      desc.className = "desc";
      desc.textContent = item.desc;
      a.append(desc);
    }

    frag.appendChild(a);
  });

  wrap.appendChild(frag);
})();
