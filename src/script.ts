// Built-in fetch is available in modern Node.js, we don't even need node-fetch if Node is >= 18.
async function check() {
  const prs = [
    'element-plus/element-plus/pulls/19166',
    'ElemeFE/element/pulls/18478',
    'apache/echarts/pulls/18390',
    'tauri-apps/tauri/pulls/2065',
    'vuejs/docs-next-zh-cn/pulls/25'
  ];

  for (const pr of prs) {
    try {
      const res = await fetch('https://api.github.com/repos/' + pr, {
        headers: { 'User-Agent': 'node' }
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`[${pr}] Author: ${data.user.login}, Title: ${data.title}`);
      } else {
        console.log(`[${pr}] Failed: ${res.status}`);
      }
    } catch (e) {
      console.log(`[${pr}] Error: ${e.message}`);
    }
  }
}
check();
