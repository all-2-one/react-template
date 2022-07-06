module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                // 新功能
                'feat',
                // 修复
                'fix',
                // 文档
                'docs',
                // 样式/格式(代码方面)
                'style',
                // 重构
                'refactor',
                // 增加测试
                'test',
                // 构建辅助工具的改动
                'chore'
            ],
        ],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
    },
};
