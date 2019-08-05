module.exports = {
    "presets": [
        ["@babel/preset-env"]
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        "dynamic-import-webpack",//动态组件加载
    ]
}