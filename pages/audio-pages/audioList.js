const imgSize = '40x40'

const songListData = [
  {
    pic: `http://p4.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg?param=${imgSize}`,
    title: '小兔子乖乖',
    author: '宝宝巴士',
    url: 'http://music.163.com/song/media/outer/url?id=566443169.mp3'
  },
  {
    pic: `http://p3.music.126.net/ybmDi6biknnuVvFIRQn0wQ==/109951164538531061.jpg?param=${imgSize}`,
    title: '两只老虎爱跳舞',
    author: '儿歌宝贝',
    url: 'http://music.163.com/song/media/outer/url?id=1408561309.mp3',
  },
  {
    pic: `http://p3.music.126.net/7gga3hxtYb6baBlozJ1vZg==/18900604881525345.jpg?param=${imgSize}`,
    title: '虫儿飞',
    author: '群星',
    url: 'http://music.163.com/song/media/outer/url?id=1293904905.mp3',
  },
  {
    pic: `http://p4.music.126.net/E_QQdGo7B1LHTo123E_trw==/109951165033259182.jpg?param=${imgSize}`,
    title: '一闪一闪亮晶晶',
    author: '儿歌',
    url: 'http://music.163.com/song/media/outer/url?id=1452601157.mp3',
  },
  {
    pic: `http://p3.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg?param=${imgSize}`,
    title: '小白兔白又白',
    author: '贝乐虎儿歌',
    url: 'http://music.163.com/song/media/outer/url?id=1417892375.mp3',
  },
  {
    pic: `http://p4.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg?param=${imgSize}`,
    title: '小毛驴',
    author: '贝乐虎儿歌',
    url: 'http://music.163.com/song/media/outer/url?id=1417892364.mp3',
  },
  {
    pic: `http://p3.music.126.net/8_ebq05t3xt2XJesP1V5FA==/75866302329323.jpg?param=${imgSize}`,
    title: '我是一条小青龙',
    author: '雨歌',
    url: 'http://music.163.com/song/media/outer/url?id=90907.mp3',
  },
  {
    pic: `http://p3.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg?param=${imgSize}`,
    title: '小星星',
    author: '贝乐虎儿歌',
    url: 'http://music.163.com/song/media/outer/url?id=1417892377.mp3',
  },
  {
    pic: `http://p3.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg?param=${imgSize}`,
    title: '我是一个粉刷匠',
    author: '贝乐虎儿歌',
    url: 'http://music.163.com/song/media/outer/url?id=1417885728.mp3',
  },
  {
    pic: `http://p4.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg?param=${imgSize}`,
    title: '白龙马',
    author: '宝宝巴士',
    url: 'http://music.163.com/song/media/outer/url?id=566443168.mp3',
  },
  {
    pic: `http://p4.music.126.net/fW5sPnW7SieVd0_FSe8gxw==/109951165631523008.jpg?param=${imgSize}`,
    title: '小老鼠上灯台',
    author: '安安',
    url: 'http://music.163.com/song/media/outer/url?id=1812267613.mp3',
  },
  {
    pic: `http://p3.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg?param=${imgSize}`,
    title: '小燕子',
    author: '宝宝巴士',
    url: 'http://music.163.com/song/media/outer/url?id=566443172.mp3',
  },
  {
    pic: `http://p3.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg?param=${imgSize}`,
    title: '采蘑菇的小姑娘',
    author: '宝宝巴士',
    url: 'http://music.163.com/song/media/outer/url?id=566443170.mp3',
  },
  {
    pic: `http://p3.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg?param=${imgSize}`,
    title: '英文字母歌',
    author: '宝宝巴士',
    url: 'http://music.163.com/song/media/outer/url?id=566442174.mp3',
  },
  {
    pic: `http://p3.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg?param=${imgSize}`,
    title: '世上只有妈妈好',
    author: '宝宝巴士',
    url: 'http://music.163.com/song/media/outer/url?id=566443174.mp3',
  },
  {
    pic: `http://p3.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg?param=${imgSize}`,
    title: '我是一个粉刷匠',
    author: '贝乐虎儿歌',
    url: 'http://music.163.com/song/media/outer/url?id=1417885728.mp3',
  }
]

const poetryListData = [
  {
    pic: `http://p3.music.126.net/JFxLwuY_yXMlEceY_wrgrA==/109951163573522992.jpg?param=${imgSize}`,
    author: "李昕融",
    title: "春晓",
    url: "http://music.163.com/song/media/outer/url?id=1316563752.mp3"
  },
  {
    pic: `http://p4.music.126.net/EILYYNY6a3MHnysgTv0FGQ==/26388279082063.jpg?param=${imgSize}`,
    author: "优子惠飞",
    title: "唐诗三百首",
    url: "http://music.163.com/song/media/outer/url?id=392038.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p3.music.126.net/YMO8P-JQR9TYozGqe0P0qA==/109951163638622592.jpg?param=${imgSize}`,
    title: "望庐山瀑布",
    url: "http://music.163.com/song/media/outer/url?id=1334595084.mp3"
  },
  {
    author: "文文姐姐",
    pic: `http://p3.music.126.net/wOaLQXVMzz_JM41FLtgTbA==/1374389547055214.jpg?param=${imgSize}`,
    title: "三字经(全文诵读版)",
    url: "http://music.163.com/song/media/outer/url?id=419594490.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p4.music.126.net/JFxLwuY_yXMlEceY_wrgrA==/109951163573522992.jpg?param=${imgSize}`,
    title: "咏鹅",
    url: "http://music.163.com/song/media/outer/url?id=1313102199.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p3.music.126.net/JFxLwuY_yXMlEceY_wrgrA==/109951163573522992.jpg?param=${imgSize}`,
    title: "静夜思",
    url: "http://music.163.com/song/media/outer/url?id=1316375818.mp3"
  },
  {
    author: "婷婷姐姐",
    pic: `http://p4.music.126.net/6Wm2WG0bL1u04xcKtjGaAg==/17788998626141249.jpg?param=${imgSize}`,
    title: "将进酒",
    url: "http://music.163.com/song/media/outer/url?id=432430409.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p4.music.126.net/JFxLwuY_yXMlEceY_wrgrA==/109951163573522992.jpg?param=${imgSize}`,
    title: "游子吟",
    url: "http://music.163.com/song/media/outer/url?id=1313052342.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p4.music.126.net/JFxLwuY_yXMlEceY_wrgrA==/109951163573522992.jpg?param=${imgSize}`,
    title: "早发白帝城",
    url: "http://music.163.com/song/media/outer/url?id=1309915174.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p4.music.126.net/YMO8P-JQR9TYozGqe0P0qA==/109951163638622592.jpg?param=${imgSize}`,
    title: "悯农 (其二)",
    url: "http://music.163.com/song/media/outer/url?id=1323302753.mp3"
  },
  {
    author: "佚名",
    pic: `http://p3.music.126.net/_A0GwTHoJ3LPXcEIH1HjRg==/18271684230936564.jpg?param=${imgSize}`,
    title: "唐诗三百首",
    url: "http://music.163.com/song/media/outer/url?id=488350762.mp3"
  },
  {
    author: "四千金",
    pic: `http://p4.music.126.net/UeyAaV4mgsKkgKv8sQ2ttg==/109951166044864887.jpg?param=${imgSize}`,
    title: "唐诗三百首",
    url: "http://music.163.com/song/media/outer/url?id=1849015859.mp3"
  },
  {
    author: "象牙海岸",
    pic: `http://p4.music.126.net/3Ugj8GXhyZ25XL4NFN2bBg==/109951164738955429.jpg?param=${imgSize}`,
    title: "唐诗三百首",
    url: "http://music.163.com/song/media/outer/url?id=506553094.mp3"
  },
  {
    author: "有声读物",
    pic: `http://p4.music.126.net/OL_989gNRNiBgYy310mT4g==/5935163767057853.jpg?param=${imgSize}`,
    title: "月下独酌",
    url: "http://music.163.com/song/media/outer/url?id=28720204.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p4.music.126.net/YMO8P-JQR9TYozGqe0P0qA==/109951163638622592.jpg?param=${imgSize}`,
    title: "忆江南 (其一)",
    url: "http://music.163.com/song/media/outer/url?id=1321382449.mp3"
  },
  {
    author: "金铭",
    pic: `http://p3.music.126.net/fa2AqqRLkaEHP55jMexvzA==/116548232557447.jpg?param=${imgSize}`,
    title: "三字经(一)",
    url: "http://music.163.com/song/media/outer/url?id=252150.mp3"
  },
  {
    author: "有声读物",
    pic: `http://p3.music.126.net/OL_989gNRNiBgYy310mT4g==/5935163767057853.jpg?param=${imgSize}`,
    title: "琵琶行",
    url: "http://music.163.com/song/media/outer/url?id=28720272.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p4.music.126.net/YMO8P-JQR9TYozGqe0P0qA==/109951163638622592.jpg?param=${imgSize}`,
    title: "望天门山",
    url: "http://music.163.com/song/media/outer/url?id=1325898479.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p3.music.126.net/JFxLwuY_yXMlEceY_wrgrA==/109951163573522992.jpg?param=${imgSize}`,
    title: "小池",
    url: "http://music.163.com/song/media/outer/url?id=1320097103.mp3"
  },
  {
    author: "有声读物",
    pic: `http://p3.music.126.net/OL_989gNRNiBgYy310mT4g==/5935163767057853.jpg?param=${imgSize}`,
    title: "下终南山过斛斯山人宿置酒",
    url: "http://music.163.com/song/media/outer/url?id=28720203.mp3"
  },
  {
    author: "有声读物",
    pic: `http://p4.music.126.net/OL_989gNRNiBgYy310mT4g==/5935163767057853.jpg?param=${imgSize}`,
    title: "梦李白",
    url: "http://music.163.com/song/media/outer/url?id=28720209.mp3"
  },
  {
    author: "瞿弦和",
    pic: `http://p3.music.126.net/_PeZMPRFfG2vm8mWkWMfDg==/76965813961948.jpg?param=${imgSize}`,
    title: "琵琶行",
    url: "http://music.163.com/song/media/outer/url?id=5273246.mp3"
  },
  {
    author: "有声读物",
    pic: `http://p4.music.126.net/OL_989gNRNiBgYy310mT4g==/5935163767057853.jpg?param=${imgSize}`,
    title: "贼退示官吏并序",
    url: "http://music.163.com/song/media/outer/url?id=28720224.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p3.music.126.net/YMO8P-JQR9TYozGqe0P0qA==/109951163638622592.jpg?param=${imgSize}`,
    title: "绝句",
    url: "http://music.163.com/song/media/outer/url?id=1329126094.mp3"
  },
  {
    author: "婷婷姐姐",
    pic: `http://p3.music.126.net/VjDN3A6qWBBHZetr2ifHYg==/109951163597769726.jpg?param=${imgSize}`,
    title: "闻王昌龄左迁龙标遥有此寄",
    url: "http://music.163.com/song/media/outer/url?id=1316375831.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p4.music.126.net/JFxLwuY_yXMlEceY_wrgrA==/109951163573522992.jpg?param=${imgSize}`,
    title: "出塞 (二首其一)",
    url: "http://music.163.com/song/media/outer/url?id=1350455245.mp3"
  },
  {
    author: "吉美之声",
    pic: `http://p3.music.126.net/orcQYlEAJOtgk4O5HtoeSg==/109951163014958666.jpg?param=${imgSize}`,
    title: "小儿垂钓",
    url: "http://music.163.com/song/media/outer/url?id=549855854.mp3"
  },
  {
    author: "吉美之声",
    pic: `http://p4.music.126.net/orcQYlEAJOtgk4O5HtoeSg==/109951163014958666.jpg?param=${imgSize}`,
    title: "咏鹅",
    url: "http://music.163.com/song/media/outer/url?id=545359275.mp3"
  },
  {
    author: "李昕融",
    pic: `http://p3.music.126.net/lxyQYofkzkOafqSyCnoKjw==/109951163707726265.jpg?param=${imgSize}`,
    title: "赠花卿",
    url: "http://music.163.com/song/media/outer/url?id=1335968777.mp3"
  },
  {
    author: "吉美之声",
    pic: `http://p4.music.126.net/orcQYlEAJOtgk4O5HtoeSg==/109951163014958666.jpg?param=${imgSize}`,
    title: "登鹳雀楼",
    url: "http://music.163.com/song/media/outer/url?id=504271873.mp3"
  },
  {
    author: "吉美之声",
    pic: `http://p4.music.126.net/orcQYlEAJOtgk4O5HtoeSg==/109951163014958666.jpg?param=${imgSize}`,
    title: "相思",
    url: "http://music.163.com/song/media/outer/url?id=502647979.mp3"
  }
]
export {
  songListData,
  poetryListData
}