import{_ as i,Y as d,Z as n,$ as e,a0 as t,a1 as r,a2 as s,D as c}from"./framework-d651fda7.js";const l="/assets/1d94f9d4fc22b384907303d94dc7034abbe95ac89298daa619199598cc2d99a4-1d94f9d4.png",o="/assets/1394cecf795e6cafa707b27a9fba2ac5455cdb99406bb628138e6480d4901bf3-1394cecf.png",p="/assets/2fa5d156047eeefc056e1d8c06c1fa176b7608ebbe93d4a5b4d2777585783441-2fa5d156.png",h="/assets/6f092e642bcf36ce539f3f9915c72b149e2290b84d1e9f3244db85292d74b61a-6f092e64.png",b="/assets/75d6f55d365f8d1aacb96ea40b39d5ba3ef400110e70c906cad63876060ef8a0-75d6f55d.png",f="/assets/b04f83511d4ea81f73d8404edf5f6b9784199e5b3b918de895d90ccd34868e34-b04f8351.png",u="/assets/c57855573c7490a7db89c5c155666d4ce73f4fb2417ced009d38663ab4121bce-c5785557.png",g={},m=s('<h1 id="blinker-esp8266-pc-power" tabindex="-1"><a class="header-anchor" href="#blinker-esp8266-pc-power" aria-hidden="true">#</a> blinker_esp8266_pc_power</h1><p>blinker控制电脑开机</p><h2 id="所需材料" tabindex="-1"><a class="header-anchor" href="#所需材料" aria-hidden="true">#</a> 所需材料</h2><ul><li>继电器底板智能插座WIFI模块</li><li>esp01s</li><li>线材若干，开关若干</li><li>binker app</li></ul><figure><img src="'+l+'" alt="图 1" tabindex="0" loading="lazy"><figcaption>图 1</figcaption></figure><figure><img src="'+o+'" alt="图 2" tabindex="0" loading="lazy"><figcaption>图 2</figcaption></figure><h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2><h3 id="接线" tabindex="-1"><a class="header-anchor" href="#接线" aria-hidden="true">#</a> 接线</h3><p><code>建议先烧录好程序，app端调试成功后在做接线调整</code></p><p>首先需要找到你电脑主板对应开关供电的接口，可以去品牌主板查询，如 <img src="'+p+'" alt="图 3" loading="lazy"></p><p><code>PWR_BTN</code> 就是开关机按钮，你随便拿个螺丝刀短接一下，看能否开机就可以了。一般是短接1s开关机，短接3秒强制关机</p><p>将原来的开关线做简单改造 原来应该是开关线（PWR GUD）直连一个前置面板的自锁电源开关</p><figure><img src="'+h+'" alt="图 4" tabindex="0" loading="lazy"><figcaption>图 4</figcaption></figure><p>你可以把这条线的连接直接接入继电器模块，等于将自锁开关的控制权移交到继电器，但是不建议直接这样，我们需要前置面板的开关和继电器都能使用</p><p>那么可以在原来的接线基础上新增2条线，接入继电器，如图示</p><figure><img src="'+b+'" alt="图 5" tabindex="0" loading="lazy"><figcaption>图 5</figcaption></figure><h3 id="修改烧录程序" tabindex="-1"><a class="header-anchor" href="#修改烧录程序" aria-hidden="true">#</a> 修改烧录程序</h3><h4 id="blinker" tabindex="-1"><a class="header-anchor" href="#blinker" aria-hidden="true">#</a> Blinker</h4><ul><li>下载Blinker app</li><li>新增设备</li><li>为设备新增一个按钮，用于控制继电器开关</li><li>为设备新增一个文本，用于显示开机状态</li></ul><figure><img src="'+f+`" alt="图 6" tabindex="0" loading="lazy"><figcaption>图 6</figcaption></figure><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><p>在main.ino中修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>char auth[] = &quot;&quot;;//Blinker key

char ssid[] = &quot;&quot;;//你的wifi名称
char pswd[] = &quot;&quot;;//你的wufi密码

BlinkerButton Button1(&quot;btn-power&quot;);//btn-power为你新增按钮的组件键名
#define TEXTE_1 &quot;tex-power&quot; //tex-power为你新增按钮的组件键名

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3><figure><img src="`+u+`" alt="图 7" tabindex="0" loading="lazy"><figcaption>图 7</figcaption></figure><p><code>尝试开关是否有反应</code></p><h3 id="代码说明" tabindex="-1"><a class="header-anchor" href="#代码说明" aria-hidden="true">#</a> 代码说明</h3><ul><li>代码中开启了一个tcp服务用于与其它模块通信，比如你不想用app进行控制，当然你也可以使用http服务，需要注意不要暴露到公网。</li><li>开机状态，因为使用ping指令来当前电脑的开机状态，所以连接的wifi与电脑使用的需要在同一局域网，因为是ip，你需要在路由器中对电脑静态分配一个ip（mac绑定），否则可能有判断问题</li><li>这部分的代码高低电平切换才开关机，你需要自行测试一下，理论上应该只要置高或者置低就行，可能是我电脑的问题，或者有知道的可以说一下原因，情况是单置高会在3s后关机</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   digitalWrite(0, 0);
   delay(1000);
   digitalWrite(0, 1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="供电问题" tabindex="-1"><a class="header-anchor" href="#供电问题" aria-hidden="true">#</a> 供电问题</h3><p>此项目我使用的供电为在usb面板取点，刚好是5v。主板可能需要开启关机时usb供电，具体操作可以百度<code>电脑关机时usb供电</code></p><h3 id="其它方案" tabindex="-1"><a class="header-anchor" href="#其它方案" aria-hidden="true">#</a> 其它方案</h3><p>检测开机状态：你可以找下主板的供电位置，比如存在3v的。用开发板的引脚去检测高地电平（注意降压，否则可能烧板），关机低电平，开机高电平，这个比较准确（其实ping也还可以，就是存在功耗问题，你可以修改代码中对ping间隔时间的逻辑） 供电：可以整一个18650电池，然后esp01s可以开启休眠模式降低功耗，再上一个充电模块当电脑在开机状态下为电池充电</p><h3 id="todo" tabindex="-1"><a class="header-anchor" href="#todo" aria-hidden="true">#</a> TODO</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 与天问开发板语音交互</label></li></ul><h3 id="相关参考" tabindex="-1"><a class="header-anchor" href="#相关参考" aria-hidden="true">#</a> 相关参考</h3>`,36),_={href:"https://blog.csdn.net/CDL_LuFei/article/details/124496972",target:"_blank",rel:"noopener noreferrer"};function x(v,k){const a=c("ExternalLinkIcon");return d(),n("div",null,[m,e("p",null,[e("a",_,[t("https://blog.csdn.net/CDL_LuFei/article/details/124496972"),r(a)])])])}const q=i(g,[["render",x],["__file","blinker_power.html.vue"]]);export{q as default};
