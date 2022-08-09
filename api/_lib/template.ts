import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(fontSize: string) {
    let background = '#ffffff';
    let cardColor = '#f5f5f5'
    let foreground = '#171717';

    return `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap');

    body {
        background: ${background};
        height: 100vh;
        box-sizing: border-box;
        padding: 44px;
        margin: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: 'Noto Sans JP', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: bold;
        background-color: ${cardColor};
        width: 100%;
        height: 100%;
        border-radius: 20px;
        color: ${foreground};
        line-height: 1.625;
        position: relative;
    }

    .title {
        overflow: hidden;
        height: calc(100% - 90px);
    }

    p {
        padding: 52px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
    }

    .logo {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 28px;
        right: 32px;
        background-color: ${cardColor};
    }

    img {
        border-radius: 9999px;
        width: 72px;
    }

    .siteTitle {
        font-size: 24px;
        margin-left: 24px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, fontSize } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
        <div class="heading">
            <div class="title">
                ${emojify(marked(text))}
            </div>
            <div class="logo">
                <img src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0MCAyNDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0idy02MCBoLTYwIj48Y2lyY2xlIGN4PSIxMjAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0iI2ZmZjVmNiIgc3Ryb2tlPSJub25lIj48L2NpcmNsZT48cGF0aCBmaWxsPSJub25lIiBkPSJtIDE2Ny42NDI3MiwxODUuNDI2MDYgYyAtMzEuODExNzQsMy43OTEzNiAtNjMuNjIzNDksMy44MjExMSAtOTUuNDM1MjMsMCI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmJhYzEiIGQ9Im0gMTM3LjQ2MTg5LDgyLjYxNTU5OCBjIDkuNjEwMTgsMTkuNDk0NjMyIDE5LjQ5Mzc1LDM4Ljg3OTkwMiAzMi4zNTM3LDU3LjA3NDYyMiAxLjEwNDY0LDIxLjg2ODE5IC0wLjcxOTM1LDQzLjM0NTg4IC01LjAwNjQ1LDY0LjQ5NTE2IDAsMCA0LjE0MjE1LC0wLjExNjQ4IDUuODg1MzgsLTEuMDg2NDQgMTIuODUyOTcsLTcuMTUyMDcgMjMuNDA1NTQsLTE4LjgyODY0IDI5LjY4MTQsLTMyLjY1MjMyIGwgMi4zOTMzOCwxMS45NjY4MiBjIDUuMjE4NDgsLTEyLjk0NDU3IDcuNTExODEsLTI2LjgyNzM0IDkuMzM4OTMsLTQyLjE5NDMgbCA1LjM5MjM4LDYuMDMxMTkgYyAtMi43OTAzOCwtMTkuNjEzMzUgLTYuMTczMDMsLTMzLjQxNDI3IC0xNC4wMTY1MiwtNDguMTkwOTIgMy4xMjk5MywtMTMuNTIxODQxIDYuMTk3ODEsLTI3LjA4MzE2MiA3LjYxMzI3LC00MS42OTYwMzUgLTE0LjE4MzI1LC0wLjYxOTgyNyAtMjYuOTc1MTUsMS4xMTQ4OTIgLTM5LjA5NTQ0LDMuOTg2MjMxIEMgMTU2Ljc5MTQ4LDUwLjIxOTU2MyAxMzYuNjY0NTIsNDIuMjQ2MTM5IDExOS45OTk5OSw0NC41NTM2NDQgMTAzLjMzNTQ4LDQyLjI0ODEzOCA4My4wMDY3ODcsNTAuMzMxMjk0IDY3Ljc5NjM0Niw2MC40NjEzNDEgNTUuMjM5MDY4LDU3LjA5ODM3OSA0Mi4yNTE3ODMsNTYuMDMzMDk0IDI4Ljc0MzAzMSw1Ni40Njk2IGMgMS41NjgyNTUsMTQuNzU5MjUxIDQuMTI5NzMzLDI4LjEzNzQ1NSA3Ljc3Mjg4Miw0MS41OTE4MSAtNy44NDM1MDEsMTQuNzc2NjUgLTExLjIyNjE0MywyOC41Nzc1NyAtMTQuMDE2NTIxLDQ4LjE5MDkxIGwgNS4zOTIzNjUsLTYuMDMxMTggYyAxLjgyNzEzNywxNS4zNjY5NiA0LjEyMDQ1OCwyOS4yNDk3MiA5LjMzODkzNyw0Mi4xOTQzIGwgMi4zOTMzNzUsLTExLjk2NjgzIGMgNi4yNzU4NTksMTMuODIzNjggMTYuODQyMjYyLDI1LjQ3NTQ2IDI5LjY4MTQwNywzMi42NTIzMiAxLjcwMzE2OSwwLjk1MjA1IDUuNzUyMTc3LDEuMDg0ODMgNS43NTIxNzcsMS4wODQ4MyAtNC42OTY3NTYsLTIxLjg1NDUxIC01LjMzOTEyOSwtNDMuMjMyMDMgLTUuMDA2NDA1LC02NC40OTQ4NCAxMi4wODQ5ODksLTE3Ljc3Mjc3IDIzLjIwMTE5MywtMzYuNTgwNCAzMi4xNzU2NTIsLTU3LjA3NDg4NiAwLjg2ODQ1LDE2LjY2MDA2NiAyLjE2ODA0LDM5LjM2OTY1NiA2Ljc4MzQsNTcuMTM5OTM2IDEuMDM0MDUsMy45ODEzNiA1LjIyMTQzLDAuOTU0MDQgMTAuOTIzMzYsMS4wNiA1LjQ1MjYxLDAuMTAxMzUgMTAuMDAyMDMsMi42MzY2IDEwLjkyMjc3LC0xLjA1OTg4IDQuNzM3MTcsLTE5LjAxODIxIDYuMjg0ODEsLTQxLjAzODAzIDYuNjA1NDYsLTU3LjE0MDQ5MiB6Ij48L3BhdGg+PHBhdGggZmlsbD0ibm9uZSIgZD0iTSAxMTkuNzc2NzQsNDQuNTI1MTg2IEMgMTE2Ljk5MDg1LDMzLjQwMTMzNyA5My41NTc4ODMsMzAuOTkzODQ3IDc0LjUzMDQwMSw0MC4wNTQ4NDQiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmNWY2IiBkPSJtIDE0MS4zMzksMTM2LjA1ODY5IDI2LjMwODU1LC00LjcxNTUxIG0gLTcuOTU5NjEsMS41MzM4MiAwLjA5NDQsMjIuODMwOTUgYyAwLjAwNywwLjk0Mzk3IC0wLjUzMzU0LDEuOTU0NDggLTIuMDYwMjksMS45Njk5MiBoIC0xMi4zMTg1MyBjIC0xLjU3NTA3LDAuMDE5IC0yLjEzMjE4LC0xLjA5MTcgLTIuMTQwNDksLTIuMDYwMjkgbCAxLjRlLTQsLTE5LjgxMDU4IE0gOTguNjU4NTUyLDEzNi4wNTg2OSA3Mi4zNSwxMzEuMzQzMTggbSA3Ljk1OTYxNSwxLjUzMzgyIC0wLjA5NDM4LDIyLjgzMDk1IGMgLTAuMDA3LDAuOTQzOTcgMC41MzM1MzQsMS45NTQ0OCAyLjA2MDI4NCwxLjk2OTkyIGggMTIuMzE4NTM1IGMgMS41NzUwNjQsMC4wMTkgMi4xMzIxOCwtMS4wOTE3IDIuMTQwNDg4LC0yLjA2MDI5IGwgLTEuNGUtNCwtMTkuODEwNTgiPjwvcGF0aD48L3N2Zz4=" />
                <span class="siteTitle">ゆるふわインターネット</span>
            </div>
        </div>
    </body>
</html>`;
}