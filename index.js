const Crisp = require("node-crisp-api");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. 初始化 Crisp 和 Gemini
const CrispClient = new Crisp();
// 使用您在 Secrets 中填写的钥匙进行验证
CrispClient.authenticate(process.env.CRISP_IDENTIFIER, process.env.CRISP_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 2. 核心业务知识库 (已更新为最新的 129 条数据，确保文字原样保留)
const KNOWLEDGE_BASE = `
Q: 客户端节点不显示延迟，延迟显示为erro
A: 重启下设备试试
---
Q: 安卓手机连接显示权限不足
A: 打开安卓手机的无线和网络  -  选择VPN  -  选择VPN或加速器的设置  -  关闭始终开启的VPN
---
Q: 安卓手机无法登陆，提示contectionreset和failedtoconnect
A: 重启下手机试试
---
Q: 标准服务套餐会卡吗？会不好用吗？
A: 标准服务高速稳定，对视频和网速有高要求的话，建议您选择高级服务
---
Q: 部分网站无法访问，部分网站打不开？
A: 请问什么网站无法访问？客户端选虚拟网卡模式试试
---
Q: 充值付款后，客户端上服务没生效
A: 付款后客户端需要退出账号，重新登陆一次账号，服务才会生效的
---
Q: 支持第三方客户端使用吗？如v2rayn，surge，shadowroket，surge，Clash等客户端添加订阅地址使用吗？
A: 订阅连接存在安全隐患，我们暂时不支持第三方客户端的订阅使用，请下载安装DOVE客户端使用
---
Q: 电脑客户端安装虚拟网卡失败
A: 重启一下电脑试试
---
Q: 定制独享服务套餐
A: 定制服务可以定制家宽服务器，可以指定国家。定制服务为：在线数20个设备，不限流量，包月1000元。
---
Q: 国内网站很卡很慢，有的国内网站打不开，客户端没有进行网络分流
A: 客户端选海外模式试试
---
Q: 标准服务，高级服务，尊贵服务，企业服务这4个套餐服务都有什么区别？
A: 按时间套餐：

标准服务：默认1个在线数，100G/月，百M共享宽带
高级服务：默认2个在线数，300G/月，千M共享宽带
尊贵服务：默认5个在线数，1T/月，百M独享宽带
企业服务：默认15个在线数，5T/月，千M独享宽带

按流量套餐（不限时间）
标准服务：75元/50G，2个在线数（500元/500G，20个在线数）
高级服务：100元/50G，3个在线数（600元/500G，30个在线数）

---
Q: 负载均衡模式是什么？
A: 负载均衡模式选择默认就可以，不用管
---
Q: 感谢用户对DOVE加速器的支持
A: 感谢支持，请推广亲友使用DOVE吧，可以获得现金奖励
---
Q: 如何更换账号的邮箱？
A: 发您的付款截图和要更换的邮箱给我，我帮您更换下
---
Q: 安卓手机如何安装谷歌三件套和安装外国APP
A: 安卓手机可以在这个网站安装国外APP：https://apkpure.com/cn
---
Q: 访问谷歌网站，需要进行人机验证
A: 这是谷歌防止机器人的人机验证，进行验证就可以
---
Q: 如何关闭DOVE客户端？
A: win客户端：请在电脑右下角，任务栏里右键点击DOVE图标退出

mac客户端：请在电脑右上角，任务栏里右键点击DOVE图标退出
---
Q: 如何关闭未支付的订单和账单？
A: 未付款账单会在1天后自动关闭
---
Q: 如何关闭账号续费？
A: 我们没有自动续费，需要您手动续费。

自动发送续费提示账单，未付款账单会在1天后自动关闭
---
Q: DOVE的官网是什么？
A: DOVE永久官网，收藏一下：

https://doveapp.cc/

---
Q: DOVE的服务套餐都有哪些国家地区节点？有土耳其，印尼，菲律宾等国家节点吗？
A: 标准服务拥有：美国，香港，日本，新加坡节点

高级/尊贵/企业服务拥有：美国，香港，日本，新加坡，俄罗斯，台湾，韩国，西班牙，土耳其，德国，英国，法国，加拿大，澳大利亚，意大利，泰国，马来西亚，越南，印尼等全球节点

---
Q: 选择海外模式还是全局模式？
A: 平常使用选海外模式，全局模式会影响本地网络
---
Q: 华为手机鸿蒙系统如何使用？
A: 华为手机支持鸿蒙4.3以内系统，请按教程设置使用，不支持鸿蒙5和鸿蒙6
---
Q: DOVE加速器服务怎么收费？年费多少？价格多少？价格表
A: 高速稳定，放心购买，价格表： 
时间套餐： 
标准：20/月，55/季，100/半年，180/11年，480/3年 
高级：40/月，110/季，200/半年，380/1年，960/3年 
尊贵：160/月，460/季，860/半年，1500/1年 
企业：460/月，1200/季，2300/半年，4500/1年 
按流量套餐（不限时间） 
标准服务：75元/599，2个在线数（500元/590G，20个在线数）
高级服务：100元，3个在线数（600元/009，20个在线数）
---
Q: DOVE客户端的使用教程，电脑和手机如何设置使用？
A: 点击按钮，查看使用教程

• Windows 电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=953
• Mac 苹果电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=956
• Linux 电脑
  链接：https://dovevip.net/knowledgebase.php?action=displayarticle&id=961
• 安卓手机/平板
  链接：https://www.dovevip.net/knowledgebase.php?action=displayarticle&id=1
• 苹果手机/平板
  链接：https://dovevip.net/knowledgebase.php?action=displayarticle&id=489
---
Q: 客户端服务器节点显示超时
A: 什么系统使用？客户端截图发我看下，我会帮您解决好的
---
Q: DOVE服务器节点网速很卡很慢，会掉线，怎么办？
A: 断开客户端后，重新选香港5，日本2节点使用试试 我们会在本周重启修复服务器，为您提供更好的服务节点
---
Q: DOVE账号服务如何升级服务？获得添加更多的在线数，更多的流量
A: 点击连接进行升级，选择需要升级的服务，补差价进行升级
---
Q: DOVE的服务器节点是静态节点吗？节点是固定的吗？
A: 我们的节点都是固定静态的干净节点
---
Q: 如何开发票？
A: 满960元，可开增值税普票

发票内容为：网络服务费
---
Q: 可以使用洋葱浏览器上暗网吗？
A: 可以上暗网，购买服务后安装设置使用
---
Q: DOVE客户端报错
A: DOVE客户端请截图我看下，我们会为您解决好
---
Q: 客户端不显示服务器节点
A: DOVE客户端请截图我看下，我们会为您解决好
---
Q: DOVE客户端软件怎么无法登陆？
A: DOVE客户端请截图我看下，我们会为您解决好
---
Q: 客户端无法下载
A: 怎么无法下载客户端？请截图我看下，我们会为您解决好
---
Q: 客户端延迟显示0ms
A: 重启下设备试试，0ms是延迟还没有读取出来，不影响连接使用
---
Q: DOVE在线客服会失联吗？有微信，QQ，telegram群吗？
A: 官网和客户端上的在线客服是独立页面，24小时可以联系到我们。

不用担心我们跑路或是失联。
---
Q: 流量用完了，服务套餐已到期或服务显示已暂停
A: 流量使用完，可以直接续费，会自动重置流量，时间也会延长。

只是提前续费，没有任何损失
---
Q: 不限制时间的流量套餐服务
A: 按流量购买不限制使用时间：

标准流量服务：75元/50G，不限使用时间，2个在线数
高级流量服务：100元/50G，不限使用时间，3个在线数
---
Q: 每月的流量会累积到下1个月吗？
A: 流量会在每月购买日自动重置，不会累积到下个月
---
Q: 苹果手机输入账号不显示内容
A: 手机设置 - 显示与亮度 - 选择浅色模式

就可以解决这个问题了
---
Q: 获取苹果APP商店的苹果ID账户
A: 在官网登录账号后，用户中心首页有两个美区ID，点击复制账号和密码使用
---
Q: 登陆苹果ID提示禁用
A: 您是APP要更新吧？显示禁用表示这个APP不是我们的ID下载的，所以无法更新，唯一的方法就是卸载重装。
---
Q: 其他客服联系方式，如微信，QQ，电话，电报，telegram等
A: 只有网站在线客服，24小时在线，随时可以联系我们。

海外运营团队，在线客服为独立页面，不会被屏蔽。
---
Q: 企业服务的内容是什么？
A: 企业服务默认15个设备在线使用，每月5T流量，提供专业的工程师服务，是我们最高端的套餐。

• 点击 - 购买企业服务
  链接：https://www.dovevip.cc/pricing.php
---
Q: 有签到功能吗？
A: 我们没有签到功能，请购买正式服务使用吧。
---
Q: 客户端上如何切换节点？
A: 先断开客户端，选择节点后（推荐日本3，香港6节点），再重新连接
---
Q: 海外模式是什么？全局模式是什么？全局模式和海外模式的区别
A: 海外模式：只加速国外网络，不影响国内网络，上外网的同时不改变设备IP

全局模式：加速国内，国外网络，影响国内网络，上外网的同时改变设备IP
---
Q: 可以用热点共享给其他设备使用吗？
A: 我们不支持热点共享哦
---
Q: 如何修改设备的IP地址？
A: 客户端选择全局模式，可以修改设备IP
---
Q: 支持软路由和路由器吗？路由如何设置？
A: 对不起哦，我们暂时不支持路由
---
Q: 如何设置代理端口？服务器代理端口是多少？
A: 代理服务器地址：127.0.0.1
默认端口：7897
---
Q: 可以免费试用吗？如何试用？
A: 对不起，暂时取消试用

产品高速稳定，请放心购买正式服务，如无法使用，我们技术员可以远程帮您调式好。
---
Q: 苹果ID提示双重认证
A: 请15分钟后解除双重再登陆，或是换另一个ID试试
---
Q: 下载安装提示木马
A: DOVE加速器是绿色软件，没有病毒，放心安装
---
Q: 下载了山寨客户端
A: 你下载的是山寨的，请点击下面按钮下载DOVE客户端

• Windows 电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=953
• Mac 苹果电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=956
• Linux 电脑
  链接：https://dovevip.net/knowledgebase.php?action=displayarticle&id=961
• 安卓手机/平板
  链接：https://www.dovevip.net/knowledgebase.php?action=displayarticle&id=1
• 苹果手机/平板
  链接：https://dovevip.net/knowledgebase.php?action=displayarticle&id=489
---
Q: 如何进行推广返利？
A: 推广活动：

推广好友购买，可返利佣金35%-60%，轻松月入万元。

佣金满100元可兑换服务，或提现到支付宝，微信，虚拟币

• 点击 - 激活推广
  链接：https://dovevip.cc/affiliates.php
---
Q: 推广域名
A: 推广域名每3个月更换一次，以防止域名被污染，影响推广员前期的推广流量。

域名更换不影响推广流量和续费佣金。
---
Q: 退款
A: 您是无法使用吗？什么设备无法使用？我们会为您解决好的
---
Q: 退款时间
A: 申请的退款会在2个工作日内原路退回
---
Q: 网吧可以使用吗？
A: 有的网吧有防火墙阻拦，不确定能否使用
---
Q: DOV客户端登陆报错
A: 鼠标一直点击客户端左上角，弹出提示后点击-是，然后重新登录客户端就可以了
---
Q: 无法安装DOVE客户端
A: 提示什么错误?截图给我看下，我们会帮您解决的
---
Q: 无法付款充值，支付页面打不开
A: 您账号多少？要购买什么服务？

我发收款码给您扫码付款，付款后自动开通
---
Q: 连接后，外网上不去，打不开，无法使用，用不了，怎么办？
A: 怎么无法使用？请截图我看下，我们会为您解决好
---
Q: 如何下载DOVE客户端？
A: 点击按钮，下载软件

• Windows 电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=953
• Mac 苹果电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=956
• Linux 电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=961
• 安卓手机/平板
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=1
• 苹果手机/平板
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=489
---
Q: 如何下载视频？
A: 下载什么网站的视频？
---
Q: 限速
A: 我们不限速，有的节点占用率高，可能速度慢。

客户端断开后节点选日本3，香港6试试
---
Q: 苹果手机使用小火箭shadowrocket
A: 小火箭订阅有安全风险，容易造成信息泄露，请按教程设置新版DOVE客户端使用
---
Q: 如何卸载DOVE客户端？
A: 直接删除DOVE客户端就可以了
---
Q: 新疆可以使用吗？
A: 新疆因为网络封锁暂时无法使有，其他地区都可以正常使用
---
Q: 我想续费DOVE服务
A: 点击下面按钮进行续费，付款后自动开通

• 点击按钮 - 续费
  链接：https://dovevip.cc/index.php?m=ReNew
---
Q: 测速延迟是什么？
A: 测速延迟越低越稳定，数值在30-200之间是正常的。

如果觉得节点慢的话，断开客户端，选节点日本6，新加坡6试试。
---
Q: 邀请好友没有获得佣金
A: 发您账号我查下，我们会帮您解决的
---
Q: 推广返利佣金如何提现？佣金可以购买服务吗？
A: 佣金满100元可申请提现或兑换服务，每月1号和15号处理提现工单，2个工作日内到账。
---
Q: 是否记录用户日志，使用数据安全吗？
A: 我们采用高级加密技术，不保存用户使用日志数据，保护用户隐私，请放心使用
---
Q: 优惠活动有那些？
A: 买1年送1个月，买3年送3个月的优惠活动。付款后，会帮您延长时间。
---
Q: 每月有多少G的流量？
A: 标准服务100G/每月 高级服务300G/每月 尊享服务1T/每月 企业服务5T/每月。 每月购买日会自动重置流量，如1月10号购买的，将会2月10号进行流量重置
---
Q: 支持那些购买付款方式？
A: 我们支持支付宝，微信付款购买服务

• 点击 - 购买服务
  链接：https://www.dovevip.cc/pricing.php
---
Q: 同时在线设备数是什么？手机和电脑可以同时使用吗？
A: 我们不绑定设备，电脑和手机通用，但是限制在线数 标准服务默认是1个在线数，高级是2个，尊贵是5个，企业是15个
---
Q: 账号服务显示暂时，是不是到期了
A: 发您账号我查下，可能是服务到期了或是月流量用完了

• 点击按钮 - 续费
  链接：https://www.dovevip.cc/pricing.php
---
Q: 提示账号不存在，忘记了邮箱账号，如何找回？
A: 购买服务了吗？请发付款截图我帮您查下
---
Q: DOVE都支持那些网站和APP？
A: 可以的，支持海外任何网站和APP，支持电脑和手机账号通用

GPT，Tiktok，Netflix，gemini，claude等都支持；高速稳定安全，放心购买。
---
Q: 支持电视TV吗？
A: 暂时只支持安卓TV

• 点击查看 - 安卓电视
  链接：https://www.dovevip.cc/knowledgebase.php?action=displayarticle&id=1
---
Q: 如何重置账号的流量？
A: 流量在每月购买日刷新：如1月2号购买的，在2月2号流量会全部刷新


如果您的流量用完了，可以提前续费，流量会重置，时间会延长
---
Q: 密码错了，忘记密码了，如何找回密码？如何重置账号的密码？
A: 点击下面按钮，输入邮箱，修改密码。

如无法操作，请发账号和密码，我帮您重置

• 点击 - 修改密码
  链接：https://dovevip.cc/pwreset.php
---
Q: 如何注册账号？
A: 输入邮箱和密码就可以注册账号

注册地址：

https://www.dovevip.cc/register.php
---
Q: 自然月是什么意思？
A: 月付解释：如1月10号购买的，到期日为2月10号
---
Q: windows电脑客户端被阻拦代理运行
A: 请关闭电脑运行的360安全卫士，火绒，或是其他VPN加速器
---
Q: 支持设置claude稳定使用吗？
A: 稳定使用claude，请选择写了原生的节点
---
Q: 支持设置cursor稳定使用吗？
A: 稳定使用cursor，请选择写了原生的节点
---
Q: 支持设置discord稳定使用吗？
A: 客户端换虚拟网卡和全局模式试试
---
Q: DOVE加速器介绍：DOVE稳定吗？安全吗？正规吗？可靠吗？运营多久了？有风险吗？会跑路吗？
A: 我们海外运营多年了，高速稳定安全，放心购买使用。

• 点击 - 购买服务
  链接：https://www.dovevip.cc/pricing.php
---
Q: 支持设置gemini稳定使用吗？
A: 稳定使用gemini，请选择写了原生的节点
---
Q: 支持设置chatgpt稳定使用吗？ChatGPT打不开，无法使用，GPT用不了，要如何设置？
A: 稳定使用gpt，请选择写了原生的节点
---
Q: 韩国网站interpark抢票购票
A: interpark抢票可以试试高级服务里的韩国节点，但是遇到interpark网站风控严格时候，就不好抢票了
---
Q: 苹果手机ios的APP如何安装？
A: 我们APP没有上传到苹果商城里

请先安装TestFlight苹果内测APP，在内测APP里安装DOVE

• 点击 - 安装DOVE应用
  链接：https://testflight.apple.com/join/YpOxKgMX
---
Q: 如何查询IP地址归属地？
A: IP查询网站： http://ping0.cc 选择全局模式连接后，在这个网站查下IP吧
---
Q: Mac苹果电脑启动错误
A: 将DOVE的APP安装在电脑应用程序里
---
Q: Mac苹果电脑启动项被禁用
A: 是否安装了腾讯柠檬或cleanmymac之类的优化软件，导致禁用了DOVE的启动项？ 请在优化软件里开启DOVE的启动项，再重新登陆使用
---
Q: mac电脑无法安装打开，提示恶意软件已损坏，需要验证开发者
A: 在电脑设置 - 安全与隐私 - 点击仍要打开，就可以解决了 
---
Q: Mac苹果电脑终端如何设置？
A: Mac终端使用需要设置代理服务器：
export https_proxy=http://127.0.0.1:1087 http_proxy=http://127.0.0.1:1087 all_proxy=socks5://127.0.0.1:1086
---
Q: telegram如何设置使用？
A: 客户端选虚拟网卡模式，连接节点后，直接使用telegram
---
Q: 如何设置tun模式使用？
A: 下载安装最新版的DOVE.2客户端，设置使用tun虚拟网卡模式

• Windows 电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=953
• Mac 苹果电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=956
• Linux 电脑
  链接：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=961
---
Q: whatsapp收不到验证码
A: 解决WhatsApp收不到验证码：

1：确定VPN可以正常翻墙

2：安装的WhatsApp为最新版

3：手机地区改成美国，语言改成英语，VPN节点选择美国

4：联通手机号运营商阻拦了，收不到验证码
---
Q: windows7系统无法使用
A: win7系统吗？请换旧版客户端使用

下载地址：https://dovevip.cc/knowledgebase.php?action=displayarticle&id=474
---
Q: windows系统安装提示webview
A: 需要安装微软webview2补丁

下载地址：

https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/consumer/?form=MA13LH
---
Q: 你好，有人工客服，真人在吗？联系在线人工客服
A: 在呢
---
Q: ios苹果手机ipad使用设置教程
A: IOS设置教程，先安装TestFlight，再安装DOVE客户端。
教程：https://doveee.net/knowledgebase.php？action=displayarticle&id=489
---
Q: 如何查看流量使用情况？
A: 在官网用户中心·产品服务-我的服务·服务详情里的流量报表，可以查看当月的流量使用情况
---
Q: 在线客服怎么发截图？
A: 点击聊天框左下角的文件按钮发送截图
---
Q: 付款后显示未支付
A: 请您发下带有账单号的付款截图，我为您查下
---
Q: Android安卓手机使用教程
A: Android安卓设备请按教程设置使用：
教程连接：
https://dovevip.cc/knowledgebase.php?action=displayarticle&id=1
---
Q: Macos苹果电脑使用教程
A: mac苹果电脑请按教程设置使用：
教程连接：
https://dovevip.cc/knowledgebase.php？action=displayarticle&id=956
---
Q: Windows系统使用教程
A: windows系统请按教程设置使用：
教程连接：
https://dovevip.cc/knowledgebase.php？action=displayarticle&id=953
---
Q: Linux系统使用教程
A: Linux系统请按教程设置使用
教程连接：
https://dovevip.cc/knowledgebase.php？action=displayarticle&id=961
---
Q: DOVE的审计规则是什么？
A: 我们没有审计规则，只禁止了BT，迅雷大量下载
---
Q: 电脑如何退出关闭客户端？
A: win客户端：请在电脑右下角，任务栏里右键点击DOVE图标退出
mac客户端：请在电脑右上角，任务栏里右键点击DOVE图标退出
---
Q: 部分网站打不开，有的网站无法访问
A: 请问什么网站打不开？客户端选全局模式试词
---
Q: 如何注销DOVE的账号?
A: 我们暂时不支持注销账号
---
Q: 如何添加更多电脑手机的在线数设备使用
A: 希望更多设备在线使用，请在服务升级里添加在线数
---
Q: 电脑打开软件后再退出，电脑就不能上网了
A: 你客户端选了全局模式，没有正常断开导致的
请选择海外模式，重新连接再断开一次，就恢复正常了
---
Q: APP客户端软件无法安装
A: 提示什么错误？截图给我看下，我们会帮您解决的
---
Q: 中国地区可以使用吗？手机和电脑可以使用吗？
A: 可以的，支持海外任何网站和APP，支持电脑和手机使用
---
Q: ChatGPT能用吗？谷歌能用吗？奈飞能用吗？youtube能用吗？facebook能用吗？whatsapp能用吗？Instagram能用吗？POE能用
A: 可以的，支持海外任何网站和APP，电脑和手机都支持使用
ChatGPT，Gemini，Tiktok，Netflix等都支持：高速稳定安全，放心购买
---
Q: 发票的开票内容是什么？
A: 开票内容：服务器租用或网络服务租用
---
Q: 苹果AppleTV电视如何安装使用
A: 暂时不支持AppleTV
---
Q: 账号提示在其他设备登陆
A: win客户端已经更新到1.71版了，下载新版客户端使用可以解决这个问题
下载链接：
https://doveee.net/dl.php？type=d&id=5
`;

const SYSTEM_INSTRUCTION = `
# 核心角色
你是 DOVE 加速器的人工客服小D。

# 极简回复规则 (必须严格遵守)
1. **禁止废话**：严禁任何礼貌用语、开场白、解释性废话及表情包。
2. **直击痛点**：只针对用户问题，从知识库中提取核心操作步骤进行回复。
3. **字数限制**：严格控制在 50 字以内。
4. **身份**：若被问及，仅回复“我是人工客服小D”。

# 核心任务
严格根据知识库回答。匹配不到则直接说：“我帮您转接到技术客服。”并输出 [ACTION_TRANSFER]。
${KNOWLEDGE_BASE}

# 紧急转人工逻辑 (最高优先级)
1. 关键词（投诉、退款、人工、在线客服）：回复“好呢，已为您转接技术客服，请稍等。”并输出 [ACTION_TRANSFER]。
2. 辱骂/极端情绪：回复“对不起，我帮您转接技术客服，请稍后。”并输出 [ACTION_TRANSFER]。
`;

// 4. 监听消息与自动回复逻辑
CrispClient.on("message:send", async (message) => {
  if (message.origin === "chat" && message.from === "user" && message.type === "text") {
    const { session_id: sessionId } = message;
    const websiteId = process.env.WEBSITE_ID;

    try {
      const prompt = `${SYSTEM_INSTRUCTION}\n\n用户消息：${message.content}`;
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      const cleanReply = aiResponse.replace("[ACTION_TRANSFER]", "").trim();

      // 发送消息到 Crisp
      await CrispClient.website.sendMessageInConversation(websiteId, sessionId, {
        type: "text",
        from: "operator",
        origin: "chat",
        content: cleanReply
      });

      // 自动转人工处理逻辑
      if (aiResponse.includes("[ACTION_TRANSFER]")) {
        await CrispClient.website.changeConversationState(websiteId, sessionId, "pending");
        console.log(`[系统通知] 小D已将对话 ${sessionId} 标记为待处理（转人工）。`);
      }

    } catch (error) {
      console.error("小D回复过程中出现错误:", error);
    }
  }
});

console.log("人工客服小D（129条全量知识库版）已重新启动！");
