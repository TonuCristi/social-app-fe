import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        /* Zinc */
        --color-zinc-50: rgb(250, 250, 250);
        --color-zinc-100: rgb(244, 244, 245);
        --color-zinc-200: rgb(228, 228, 231);
        --color-zinc-300: rgb(212, 212, 216);
        --color-zinc-400: rgb(161, 161, 170);
        --color-zinc-500: rgb(113, 113, 122);
        --color-zinc-600: rgb(82, 82, 91);
        --color-zinc-700: rgb(63, 63, 70);
        --color-zinc-800: rgb(39, 39, 42);
        --color-zinc-900: rgb(24, 24, 27);
        --color-zinc-950: rgb(9, 9, 11);
        --color-zinc-blur-950: rgb(9, 9, 11, 0.8);

        /* Sky */
        --color-sky-50: rgb(240, 249, 255);
        --color-sky-100: rgb(224, 242, 254);
        --color-sky-200: rgb(186, 230, 253);
        --color-sky-300: rgb(125, 211, 252);
        --color-sky-400: rgb(56, 189, 248);
        --color-sky-blur-400: rgb(56, 189, 248, 0.3);
        --color-sky-500: rgb(14, 165, 233);
        --color-sky-blur-500: rgb(14, 165, 233, 0.3);
        --color-sky-600: rgb(2, 132, 199);
        --color-sky-700: rgb(3, 105, 161);
        --color-sky-800: rgb(7, 89, 133);
        --color-sky-900: rgb(12, 74, 110);
        --color-sky-950: rgb(8, 47, 73);

        /* Red */
        --color-red-500: rgb(239, 68, 68);
        --color-red-400: rgb(248, 113, 113);
        --color-red-blur-400: rgb(248, 113, 113, 0.3);

        /* Emerald */
        --color-emerald-500: rgb(16, 185, 129);
        --color-emerald-blur-500: rgb(16, 185, 129, 0.3);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: inherit;
        font-size: inherit;
    }

    html {
        font-size: 62.5%;
    }

    body {
        line-height: 1;
        font-weight: 400;
        font-size: 1.6rem;
        font-family: "Roboto", sans-serif;
        background-color: var(--color-zinc-950);
        overflow-x: hidden;
    }
`;

export default GlobalStyle;
