// SAMPLE
this.manifest = {
    "name": "Auto Flight Booking Settings",
    "icon": "icon.png",
    "settings": [
        {
            "tab": "Theo dõi giá vé",
            "name": "minPrice",
            "type": "text",
            "label": "Giá tối đa: ",
            "text": "500000"
        },
        {
            "tab": "Theo dõi giá vé",
            "name": "reloadSecond",
            "type": "text",
            "label": "Thời gian kiểm tra lại giá vé (tính bằng giây): ",
            "text": "10"
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 1',
            'label': 'Quý danh:',
            "name": "jetstar.title",
            "type": "popupButton",
            "options": {
                "values": [
                    {
                        "value": "",
                        "text": "--"
                    },
                    {
                        "value": "MR",
                        "text": 'Mr'
                    },
                    {
                        "value": "MRS",
                        'text': 'Mrs'
                    },
                    {
                        'value': 'MISS',
                        'text': 'Miss'
                    },
                    {
                        'value': 'MS',
                        'text': 'Ms'
                    },
                    {
                        'value': 'MSTR',
                        'text': 'Master'
                    },
                    {
                        'value': 'CAPT',
                        'text': 'Captain'
                    },
                    {
                        'value': 'DR',
                        'text': 'Doctor'
                    },
                    {
                        'value': 'PROF',
                        'text': 'Professor'
                    },
                    {
                        'value': 'REV',
                        'text': 'Reverend'
                    }
                ],
            },
        },
        {
            "tab": 'JetStar',
            "group": 'Thông tin hành khách 1',
            "name": "jetstar.lastName",
            "type": "text",
            "label": 'Tên'
        },
        {
            "tab": 'JetStar',
            "group": 'Thông tin hành khách 1',
            "name": "jetstar.firstName",
            "type": "text",
            "label": 'Họ và tên đệm'
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 1',
            'label': 'Giới tính:',
            "name": "jetstar.gender",
            "type": "popupButton",
            "options": {
                "values": [
                    {
                        "value": "",
                        "text": "--"
                    },
                    {
                        "value": "1",
                        "text": 'Nam'
                    },
                    {
                        "value": "2",
                        'text': 'Nữ'
                    }
                ],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 1',
            'label': 'Ngày sinh:',
            "name": "jetstar.dob",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"1","text":"1"},{"value":"2","text":"2"},{"value":"3","text":"3"},{"value":"4","text":"4"},{"value":"5","text":"5"},{"value":"6","text":"6"},{"value":"7","text":"7"},{"value":"8","text":"8"},{"value":"9","text":"9"},{"value":"10","text":"10"},{"value":"11","text":"11"},{"value":"12","text":"12"},{"value":"13","text":"13"},{"value":"14","text":"14"},{"value":"15","text":"15"},{"value":"16","text":"16"},{"value":"17","text":"17"},{"value":"18","text":"18"},{"value":"19","text":"19"},{"value":"20","text":"20"},{"value":"21","text":"21"},{"value":"22","text":"22"},{"value":"23","text":"23"},{"value":"24","text":"24"},{"value":"25","text":"25"},{"value":"26","text":"26"},{"value":"27","text":"27"},{"value":"28","text":"28"},{"value":"29","text":"29"},{"value":"30","text":"30"},{"value":"31","text":"31"}],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 1',
            'label': 'Tháng sinh:',
            "name": "jetstar.mob",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"1","text":"Thg1"},{"value":"2","text":"Thg2"},{"value":"3","text":"Thg3"},{"value":"4","text":"Thg4"},{"value":"5","text":"Thg5"},{"value":"6","text":"Thg6"},{"value":"7","text":"Thg7"},{"value":"8","text":"Thg8"},{"value":"9","text":"Thg9"},{"value":"10","text":"Thg10"},{"value":"11","text":"Thg11"},{"value":"12","text":"Thg12"}],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 1',
            'label': 'Năm sinh:',
            "name": "jetstar.yob",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"2014","text":"2014"},{"value":"2013","text":"2013"},{"value":"2012","text":"2012"},{"value":"2011","text":"2011"},{"value":"2010","text":"2010"},{"value":"2009","text":"2009"},{"value":"2008","text":"2008"},{"value":"2007","text":"2007"},{"value":"2006","text":"2006"},{"value":"2005","text":"2005"},{"value":"2004","text":"2004"},{"value":"2003","text":"2003"},{"value":"2002","text":"2002"},{"value":"2001","text":"2001"},{"value":"2000","text":"2000"},{"value":"1999","text":"1999"},{"value":"1998","text":"1998"},{"value":"1997","text":"1997"},{"value":"1996","text":"1996"},{"value":"1995","text":"1995"},{"value":"1994","text":"1994"},{"value":"1993","text":"1993"},{"value":"1992","text":"1992"},{"value":"1991","text":"1991"},{"value":"1990","text":"1990"},{"value":"1989","text":"1989"},{"value":"1988","text":"1988"},{"value":"1987","text":"1987"},{"value":"1986","text":"1986"},{"value":"1985","text":"1985"},{"value":"1984","text":"1984"},{"value":"1983","text":"1983"},{"value":"1982","text":"1982"},{"value":"1981","text":"1981"},{"value":"1980","text":"1980"},{"value":"1979","text":"1979"},{"value":"1978","text":"1978"},{"value":"1977","text":"1977"},{"value":"1976","text":"1976"},{"value":"1975","text":"1975"},{"value":"1974","text":"1974"},{"value":"1973","text":"1973"},{"value":"1972","text":"1972"},{"value":"1971","text":"1971"},{"value":"1970","text":"1970"},{"value":"1969","text":"1969"},{"value":"1968","text":"1968"},{"value":"1967","text":"1967"},{"value":"1966","text":"1966"},{"value":"1965","text":"1965"},{"value":"1964","text":"1964"},{"value":"1963","text":"1963"},{"value":"1962","text":"1962"},{"value":"1961","text":"1961"},{"value":"1960","text":"1960"},{"value":"1959","text":"1959"},{"value":"1958","text":"1958"},{"value":"1957","text":"1957"},{"value":"1956","text":"1956"},{"value":"1955","text":"1955"},{"value":"1954","text":"1954"},{"value":"1953","text":"1953"},{"value":"1952","text":"1952"},{"value":"1951","text":"1951"},{"value":"1950","text":"1950"},{"value":"1949","text":"1949"},{"value":"1948","text":"1948"},{"value":"1947","text":"1947"},{"value":"1946","text":"1946"},{"value":"1945","text":"1945"},{"value":"1944","text":"1944"},{"value":"1943","text":"1943"},{"value":"1942","text":"1942"},{"value":"1941","text":"1941"},{"value":"1940","text":"1940"},{"value":"1939","text":"1939"},{"value":"1938","text":"1938"},{"value":"1937","text":"1937"},{"value":"1936","text":"1936"},{"value":"1935","text":"1935"},{"value":"1934","text":"1934"},{"value":"1933","text":"1933"},{"value":"1932","text":"1932"},{"value":"1931","text":"1931"},{"value":"1930","text":"1930"},{"value":"1929","text":"1929"},{"value":"1928","text":"1928"},{"value":"1927","text":"1927"},{"value":"1926","text":"1926"},{"value":"1925","text":"1925"},{"value":"1924","text":"1924"},{"value":"1923","text":"1923"},{"value":"1922","text":"1922"},{"value":"1921","text":"1921"},{"value":"1920","text":"1920"},{"value":"1919","text":"1919"},{"value":"1918","text":"1918"},{"value":"1917","text":"1917"},{"value":"1916","text":"1916"},{"value":"1915","text":"1915"},{"value":"1914","text":"1914"},{"value":"1913","text":"1913"},{"value":"1912","text":"1912"},{"value":"1911","text":"1911"},{"value":"1910","text":"1910"},{"value":"1909","text":"1909"},{"value":"1908","text":"1908"},{"value":"1907","text":"1907"},{"value":"1906","text":"1906"},{"value":"1905","text":"1905"},{"value":"1904","text":"1904"},{"value":"1903","text":"1903"},{"value":"1902","text":"1902"},{"value":"1901","text":"1901"},{"value":"1900","text":"1900"}],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 2',
            'label': 'Quý danh:',
            "name": "jetstar.title2",
            "type": "popupButton",
            "options": {
                "values": [
                    {
                        "value": "",
                        "text": "--"
                    },
                    {
                        "value": "MR",
                        "text": 'Mr'
                    },
                    {
                        "value": "MRS",
                        'text': 'Mrs'
                    },
                    {
                        'value': 'MISS',
                        'text': 'Miss'
                    },
                    {
                        'value': 'MS',
                        'text': 'Ms'
                    },
                    {
                        'value': 'MSTR',
                        'text': 'Master'
                    },
                    {
                        'value': 'CAPT',
                        'text': 'Captain'
                    },
                    {
                        'value': 'DR',
                        'text': 'Doctor'
                    },
                    {
                        'value': 'PROF',
                        'text': 'Professor'
                    },
                    {
                        'value': 'REV',
                        'text': 'Reverend'
                    }
                ],
            },
        },
        {
            "tab": 'JetStar',
            "group": 'Thông tin hành khách 2',
            "name": "jetstar.lastName2",
            "type": "text",
            "label": 'Tên'
        },
        {
            "tab": 'JetStar',
            "group": 'Thông tin hành khách 2',
            "name": "jetstar.firstName2",
            "type": "text",
            "label": 'Họ và tên đệm'
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 2',
            'label': 'Giới tính:',
            "name": "jetstar.gender2",
            "type": "popupButton",
            "options": {
                "values": [
                    {
                        "value": "",
                        "text": "--"
                    },
                    {
                        "value": "1",
                        "text": 'Nam'
                    },
                    {
                        "value": "2",
                        'text': 'Nữ'
                    }
                ],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 2',
            'label': 'Ngày sinh:',
            "name": "jetstar.dob2",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"1","text":"1"},{"value":"2","text":"2"},{"value":"3","text":"3"},{"value":"4","text":"4"},{"value":"5","text":"5"},{"value":"6","text":"6"},{"value":"7","text":"7"},{"value":"8","text":"8"},{"value":"9","text":"9"},{"value":"10","text":"10"},{"value":"11","text":"11"},{"value":"12","text":"12"},{"value":"13","text":"13"},{"value":"14","text":"14"},{"value":"15","text":"15"},{"value":"16","text":"16"},{"value":"17","text":"17"},{"value":"18","text":"18"},{"value":"19","text":"19"},{"value":"20","text":"20"},{"value":"21","text":"21"},{"value":"22","text":"22"},{"value":"23","text":"23"},{"value":"24","text":"24"},{"value":"25","text":"25"},{"value":"26","text":"26"},{"value":"27","text":"27"},{"value":"28","text":"28"},{"value":"29","text":"29"},{"value":"30","text":"30"},{"value":"31","text":"31"}],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 2',
            'label': 'Tháng sinh:',
            "name": "jetstar.mob2",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"1","text":"Thg1"},{"value":"2","text":"Thg2"},{"value":"3","text":"Thg3"},{"value":"4","text":"Thg4"},{"value":"5","text":"Thg5"},{"value":"6","text":"Thg6"},{"value":"7","text":"Thg7"},{"value":"8","text":"Thg8"},{"value":"9","text":"Thg9"},{"value":"10","text":"Thg10"},{"value":"11","text":"Thg11"},{"value":"12","text":"Thg12"}],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin hành khách 2',
            'label': 'Năm sinh:',
            "name": "jetstar.yob2",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"2014","text":"2014"},{"value":"2013","text":"2013"},{"value":"2012","text":"2012"},{"value":"2011","text":"2011"},{"value":"2010","text":"2010"},{"value":"2009","text":"2009"},{"value":"2008","text":"2008"},{"value":"2007","text":"2007"},{"value":"2006","text":"2006"},{"value":"2005","text":"2005"},{"value":"2004","text":"2004"},{"value":"2003","text":"2003"},{"value":"2002","text":"2002"},{"value":"2001","text":"2001"},{"value":"2000","text":"2000"},{"value":"1999","text":"1999"},{"value":"1998","text":"1998"},{"value":"1997","text":"1997"},{"value":"1996","text":"1996"},{"value":"1995","text":"1995"},{"value":"1994","text":"1994"},{"value":"1993","text":"1993"},{"value":"1992","text":"1992"},{"value":"1991","text":"1991"},{"value":"1990","text":"1990"},{"value":"1989","text":"1989"},{"value":"1988","text":"1988"},{"value":"1987","text":"1987"},{"value":"1986","text":"1986"},{"value":"1985","text":"1985"},{"value":"1984","text":"1984"},{"value":"1983","text":"1983"},{"value":"1982","text":"1982"},{"value":"1981","text":"1981"},{"value":"1980","text":"1980"},{"value":"1979","text":"1979"},{"value":"1978","text":"1978"},{"value":"1977","text":"1977"},{"value":"1976","text":"1976"},{"value":"1975","text":"1975"},{"value":"1974","text":"1974"},{"value":"1973","text":"1973"},{"value":"1972","text":"1972"},{"value":"1971","text":"1971"},{"value":"1970","text":"1970"},{"value":"1969","text":"1969"},{"value":"1968","text":"1968"},{"value":"1967","text":"1967"},{"value":"1966","text":"1966"},{"value":"1965","text":"1965"},{"value":"1964","text":"1964"},{"value":"1963","text":"1963"},{"value":"1962","text":"1962"},{"value":"1961","text":"1961"},{"value":"1960","text":"1960"},{"value":"1959","text":"1959"},{"value":"1958","text":"1958"},{"value":"1957","text":"1957"},{"value":"1956","text":"1956"},{"value":"1955","text":"1955"},{"value":"1954","text":"1954"},{"value":"1953","text":"1953"},{"value":"1952","text":"1952"},{"value":"1951","text":"1951"},{"value":"1950","text":"1950"},{"value":"1949","text":"1949"},{"value":"1948","text":"1948"},{"value":"1947","text":"1947"},{"value":"1946","text":"1946"},{"value":"1945","text":"1945"},{"value":"1944","text":"1944"},{"value":"1943","text":"1943"},{"value":"1942","text":"1942"},{"value":"1941","text":"1941"},{"value":"1940","text":"1940"},{"value":"1939","text":"1939"},{"value":"1938","text":"1938"},{"value":"1937","text":"1937"},{"value":"1936","text":"1936"},{"value":"1935","text":"1935"},{"value":"1934","text":"1934"},{"value":"1933","text":"1933"},{"value":"1932","text":"1932"},{"value":"1931","text":"1931"},{"value":"1930","text":"1930"},{"value":"1929","text":"1929"},{"value":"1928","text":"1928"},{"value":"1927","text":"1927"},{"value":"1926","text":"1926"},{"value":"1925","text":"1925"},{"value":"1924","text":"1924"},{"value":"1923","text":"1923"},{"value":"1922","text":"1922"},{"value":"1921","text":"1921"},{"value":"1920","text":"1920"},{"value":"1919","text":"1919"},{"value":"1918","text":"1918"},{"value":"1917","text":"1917"},{"value":"1916","text":"1916"},{"value":"1915","text":"1915"},{"value":"1914","text":"1914"},{"value":"1913","text":"1913"},{"value":"1912","text":"1912"},{"value":"1911","text":"1911"},{"value":"1910","text":"1910"},{"value":"1909","text":"1909"},{"value":"1908","text":"1908"},{"value":"1907","text":"1907"},{"value":"1906","text":"1906"},{"value":"1905","text":"1905"},{"value":"1904","text":"1904"},{"value":"1903","text":"1903"},{"value":"1902","text":"1902"},{"value":"1901","text":"1901"},{"value":"1900","text":"1900"}],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Hành lý',
            'label': 'Khởi hành:',
            "name": "jetstar.baggage1",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"none","text":"thêm 0kg Hành lý ký gửi mỗi khách(VND0 mỗi)"},{"value":"BG15","text":"thêm 15kg Hành lý ký gửi mỗi khách(VND130.000 mỗi)"},{"value":"BG20","text":"thêm 20kg Hành lý ký gửi mỗi khách(VND160.000 mỗi)"},{"value":"BG25","text":"thêm 25kg Hành lý ký gửi mỗi khách(VND220.000 mỗi)"},{"value":"BG30","text":"thêm 30kg Hành lý ký gửi mỗi khách(VND270.000 mỗi)"},{"value":"BG35","text":"thêm 35kg Hành lý ký gửi mỗi khách(VND320.000 mỗi)"},{"value":"BG40","text":"thêm 40kg Hành lý ký gửi mỗi khách(VND370.000 mỗi)"}],
            },
        },
        {
            "tab": "JetStar",
            "group": 'Hành lý',
            'label': 'Chặng về:',
            "name": "jetstar.baggage2",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"none","text":"thêm 0kg Hành lý ký gửi mỗi khách(VND0 mỗi)"},{"value":"BG15","text":"thêm 15kg Hành lý ký gửi mỗi khách(VND130.000 mỗi)"},{"value":"BG20","text":"thêm 20kg Hành lý ký gửi mỗi khách(VND160.000 mỗi)"},{"value":"BG25","text":"thêm 25kg Hành lý ký gửi mỗi khách(VND220.000 mỗi)"},{"value":"BG30","text":"thêm 30kg Hành lý ký gửi mỗi khách(VND270.000 mỗi)"},{"value":"BG35","text":"thêm 35kg Hành lý ký gửi mỗi khách(VND320.000 mỗi)"},{"value":"BG40","text":"thêm 40kg Hành lý ký gửi mỗi khách(VND370.000 mỗi)"}],
            },
        },
        {
            "tab": 'JetStar',
            "group": 'Chi tiêt liên hệ',
            "name": "jetstar.email",
            "type": "text",
            "label": 'Email:'
        },
        {
            "tab": 'JetStar',
            "group": 'Chi tiêt liên hệ',
            "name": "jetstar.mobile",
            "type": "text",
            "label": 'Điện thoại (+84):'
        },
        {
            "tab": 'JetStar',
            "group": 'Thông tin địa chỉ',
            "name": "jetstar.street",
            "type": "text",
            "label": 'Phố/Đường:'
        },
        {
            "tab": 'JetStar',
            "group": 'Thông tin địa chỉ',
            "name": "jetstar.city",
            "type": "text",
            "label": 'Thành phố/Thị trấn:'
        },
        {
            "tab": "JetStar",
            "group": 'Thông tin địa chỉ',
            'label': 'Tỉnh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:',
            "name": "jetstar.province",
            "type": "popupButton",
            "options": {
                "values": [{"value":"","text":"--"},{"value":"VN|BMV","text":"Buon Me Thuot"},{"value":"VN|DAD","text":"Da Nang"},{"value":"VN|DLI","text":"Da Lat"},{"value":"VN|HAN","text":"Ha Noi"},{"value":"VN|HPH","text":"Hai Phong"},{"value":"VN|HUI","text":"Hue"},{"value":"VN|NHA","text":"Cam Ranh"},{"value":"VN|NHT","text":"Nha Trang"},{"value":"VN|SGN","text":"Ho Chi Minh City"},{"value":"VN|VCA","text":"Can Tho"},{"value":"VN|VII","text":"Vinh City"},{"value":"VN|VKG","text":"Kien Giang"}],
            },
        },
        {
            "tab": 'JetStar',
            "group": 'Thông tin địa chỉ',
            "name": "jetstar.postCode",
            "type": "text",
            "label": 'Mã bưu điện:'
        },
        {
            "tab": "Details",
            "group": "Sound",
            "name": "noti_volume",
            "type": "slider",
            "label": "Notification volume:",
            "max": 1,
            "min": 0,
            "step": 0.01,
            "display": true,
            "displayModifier": function (value) {
                return (value * 100).floor() + "%";
            }
        },
        {
            "tab": "Details",
            "group": "Sound",
            "name": "sound_volume",
            "type": "slider",
            "label": "Sound volume:",
            "max": 100,
            "min": 0,
            "step": 1,
            "display": true,
            "displayModifier": function (value) {
                return value + "%";
            }
        },
        {
            "tab": "Details",
            "group": "Food",
            "name": "myPopupButton",
            "type": "popupButton",
            "label": "Soup 1 should be:",
            "options": {
                "groups": [
                    "Hot", "Cold",
                ],
                "values": [
                    {
                        "value": "hot",
                        "text": "Very hot",
                        "group": "Hot",
                    },
                    {
                        "value": "Medium",
                        "group": 1,
                    },
                    {
                        "value": "Cold",
                        "group": 2,
                    },
                    ["Non-existing"]
                ],
            },
        },
        {
            "tab": "Details",
            "group": "Food",
            "name": "myListBox",
            "type": "listBox",
            "label": "Soup 2 should be:",
            "options": [
                ["hot", "Hot and yummy"],
                ["cold"]
            ]
        },
        {
            "tab": "Details",
            "group": "Food",
            "name": "myRadioButtons",
            "type": "radioButtons",
            "label": "Soup 3 should be:",
            "options": [
                ["hot", "Hot and yummy"],
                ["cold"]
            ]
        }
    ],
    "alignment": [
        [
            "minPrice",
            "reloadSecond"
        ],
        [
            'jetstar.title'
        ],
        [
            "jetstar.lastName",
            'jetstar.firstName',
        ],
        [
            'jetstar.gender',
            'jetstar.dob',
            'jetstar.mob',
            'jetstar.yob'
        ],
        [
            'jetstar.baggage1',
            'jetstar.baggage2'
        ],
        [
            'jetstar.email',
            'jetstar.mobile'
        ],
        [
            'jetstar.street',
            'jetstar.city',
            'jetstar.postCode'
        ]
    ]
};
