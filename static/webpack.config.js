const path = require("path");
const entry = require("./utils/getPath");

module.exports = () => {
    console.log(entry);

    return {
        entry: {
            ...entry
        },
        output: {
            path: path.resolve(__dirname, "js"),
            filename: "[name].js"
        },
        // 开发时选择 development 模式 不会对js代码进行压缩 编译速度快一点
        // 上线时选择 production 模式 会对js代码 进行压缩 去除注释 编译速度慢
        // mode: "production",
        mode: "development",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                babelrc: false,
                                presets: [
                                    [
                                        // "@babel/preset-env",
                                        require.resolve("@babel/preset-env"),
                                        {
                                            modules: false
                                        }
                                    ]
                                ],
                                cacheDirectory: true,
                                plugins: [
                                    [
                                        "@babel/plugin-transform-runtime",
                                        {
                                            corejs: false,
                                            // helper: true,
                                            helpers: true,

                                            regenerator: true,
                                            useESModules: true
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    };
};
