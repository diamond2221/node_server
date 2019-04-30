(function() {
    //防止多次提交
    var clickBol = true;
    // 获取到需要提交的一些表单元素;
    var $name = $("#name");
    var $phone = $("#phone");
    var $plate = $("#plate");
    var $brand = $("#brand");
    var $carType = $("#carType");

    function maxLength($el, len) {
        var val = $el.val();
        $el.val(val.slice(0, len));
    }
    // $name.on("change", function() {
    //     // maxLength($(this), 12);
    // });
    // $name.on("input", function() {
    //     // maxLength($(this), 12);
    // });

    $phone.on("change", function() {
        maxLength($(this), 11);
    });
    $phone.on("input", function() {
        maxLength($(this), 11);
    });

    // $plate.on("change", function() {
    //     maxLength($(this), 10);
    // });
    // $plate.on("input", function() {
    //     maxLength($(this), 10);
    // });

    // $brand.on("input", function() {
    //     maxLength($(this), 12);
    // });
    // $brand.on("change", function() {
    //     maxLength($(this), 12);
    // });

    // $carType.on("input", function() {
    //     maxLength($(this), 12);
    // });
    // $carType.on("change", function() {
    //     maxLength($(this), 12);
    // });

    // 获取提交按钮元素
    var $submit = $("#submit");

    // 定义模态框多个状态的文本
    var content = {
        success: {
            title: "领取福利成功",
            message: "请注意查收短信，凭短信验证码到店消费"
        },
        repeat: {
            title: "同一辆车不能重复领取",
            message:
                "好酒不贪杯，好事多分享，快将此福利转发分享给身边的亲戚朋友吧"
        },
        sellout: {
            title: "活动商品已售罄",
            message: "请持续关注商家新的优惠活动。"
        }
    };

    var openMask = state => {
        /***
         * 用来切换模态框的内容和样式
         *  state
         *      type: string,
         *      可选值: ['success', "repeat", "sellout"]
         *          success 领取成功
         *          repeat  不能重复领取
         *          sellout 售罄
         *      必填
         */

        // 获取蒙版元素
        var $mask = $("#mask");
        // 获取蒙版元素中的内容元素
        var $content = $("#mask .content");
        var classArr = ["success", "repeat", "sellout"];

        // 将模态框显示（通过移除类名 hidden）
        $mask.removeClass("hidden");

        // 循环将之前可能存在的样式清除（也是通过移除类名）
        classArr.forEach(item => {
            $content.removeClass(item);
        });

        // 修改html中的内容
        $content.children(".title").html(content[state].title);
        $content.children(".message").html(content[state].message);

        // 添加内容区域的样式
        $content.addClass(state);
    };
    var timer = null;
    function notification(message, cb) {
        $("#notification")
            .html(message)
            .fadeIn(500, function() {
                timer = setTimeout(
                    function() {
                        $(this).fadeOut(500, function(params) {
                            cb && cb();
                            clearTimeout(timer);
                        });
                    }.bind(this),
                    2400
                );
            });
    }
    var loading = (function() {
        var $loading = $("#loading");
        return {
            open: function() {
                $loading.fadeIn(600);
            },
            close: function() {
                $loading.fadeOut(600);
            }
        };
    })();
    // loading.open(); // 开启方法
    // loading.close(); // 关闭方法
    function openLock() {
        clickBol = true;
    }
    // 给提交按钮绑定点击事件
    $submit.on("click", async function() {
        if (clickBol) {
            clickBol = false;
            var nameV = $name.val();
            // 只判断用户姓名是否填写
            if (!nameV) {
                $name.trigger("focus");
                notification("请输入车主姓名", openLock);
                return;
            }

            var phoneV = devarSpaceInStr($phone.val());
            if (!phoneV || !checkMobileReg(phoneV)) {
                $phone.trigger("focus");
                notification("请输入正确的手机号", openLock);
                return;
            }
            var plateV = $plate.val();
            if (!plateV) {
                $plate.trigger("focus");
                notification("请输入车牌号", openLock);
                return;
            }
            if (!checkCarCardReg(plateV)) {
                $plate.trigger("focus");
                notification("请输入正确的车牌号", openLock);
                return;
            }
            var brandV = $brand.val();
            var carTypeV = $carType.val();
            var arr2 = window.location.search.split("&");
            var dataCon = {
                channel: arr2[1],
                productId: arr2[3],
                name: nameV,
                telephone: phoneV,
                plateNum: plateV,
                brandName: brandV,
                modelName: carTypeV
            };
            loading.open(); //loading
            $.ajax({
                url: addURL() + "/luotuo/submit",
                type: "post",
                async: true,
                data: dataCon,
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    if (data.code == 200) {
                        if (data.data.code == 200) {
                            loading.close(); //loading
                            setTimeout(function() {
                                if (data.data.data.type == 1) {
                                    //成功
                                    openMask("success");
                                } else if (data.data.data.type == 2) {
                                    //重复
                                    openMask("repeat");
                                } else if (data.data.data.type == 3) {
                                    //售罄
                                    openMask("sellout");
                                }
                                clickBol = true;
                                $(".confirm").on("click", function() {
                                    var urlT = window.location.href.split(
                                        "submit"
                                    )[0];
                                    window.location.href = urlT + arr2[1];
                                });
                            }, 700);
                        } else {
                            loading.close(); //loading
                            setTimeout(function() {
                                notification(data.data.message, openLock);
                            }, 700);
                        }
                    } else {
                        loading.close(); //loading
                        setTimeout(function() {
                            notification(data.msg, openLock);
                        }, 700);
                    }
                },
                error: function(data) {
                    // alert("err");
                    loading.close(); //loading
                    setTimeout(function() {
                        console.log(data.msg);
                        notification(data.msg, openLock);
                    }, 700);
                }
            });
        }
    });
    var $form = $("form");
    $form.on("focus", "input", function() {
        $(this).addClass("focus");
    });
    $form.on("blur", "input", function() {
        $(this).removeClass("focus");
    });
    $("input").blur(function() {
        setTimeout(() => {
            const scrollHeight =
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    });
    const p = new Promise((resolve, reject) => {
        $.ajax({
            method: "post",
            headers: {
                "Content-Type": "application/json;Charset=utf-8"
            },
            url: "http://127.0.0.1:3000/testpost",
            data: JSON.stringify({
                username: "zhangsan",
                age: 22,
                sex: "man"
            }),
            success(res) {
                resolve(res);
            },
            error(err) {
                reject(err);
            }
        });
    });
    (async _ => {
        const res = await p;
        console.log(res.data);
    })();
})();
