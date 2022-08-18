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
    @font-face {
        font-family: 'Zen Maru Gothic';
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url(/ZenMaruGothic.woff2) format('woff2');
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

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: 'Zen Maru Gothic', sans-serif;
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
        overflow: hidden;
    }

    .title {
        overflow: hidden;
        height: calc(100% - 90px);
        position: absolute;
        top: 0;
    }

    p {
        padding: 52px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
    }

    .icon {
        width: 650px;
        position: absolute;
        right: -150px;
        bottom: -175px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, fontSize } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <link
        rel="preload"
        href="/ZenMaruGothic.woff2"
        as="font"
        type="font/woff2"
        crossorigin
    />
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
        <div class="heading">
            <div class="icon">
                <img src="https://icon.object1037.dev/svg?hair=0000&bg=0000&stroke=d4d4d4" />
            </div>
            <div class="title">
                ${emojify(marked(text))}
            </div>
        </div>
    </body>
</html>`;
}