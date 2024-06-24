// src/app/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage;

        const cache = createCache({ key: 'css' });
        const { extractCriticalToChunks } = createEmotionServer(cache);

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    <App emotionCache={cache} {...props} />,
            });

        const initialProps = await Document.getInitialProps(ctx);
        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(' ')}`}
                key={style.key}
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        ));

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {emotionStyleTags}
                </>
            ),
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
