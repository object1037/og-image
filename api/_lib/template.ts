import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(fontSize: string) {
    let background = '#ffffff';
    let cardColor = '#f5f5f5'
    let foreground = '#171717';

    return `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap');

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

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

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: medium;
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
        width: 68px;
    }

    .siteTitle {
        font-size: 24px;
        margin-left: 24px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, md, fontSize } = parsedReq;
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
            ${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
            <div class="logo">
                <img src="https://blog.object1037.dev/images/profile.jpg" />
                <span class="siteTitle">ゆるふわインターネット</span>
            </div>
        </div>
    </body>
</html>`;
}