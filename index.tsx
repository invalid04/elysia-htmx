import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'

const app = new Elysia().use(html())

.get('/', ({ html }) => 
    html(
        <BaseHtml>
            <body>
                <button hx-post='/clicked' hx-swap='outerHTML'>
                    click me
                </button>
            </body>
        </BaseHtml>
    )
)

.post('/clicked', () => <div class='text-blue-500'>im from the server</div>)

.listen(3000)

const BaseHtml = ({ children }: elements.Children) => `
<DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elysia</title>
    <script src="https://unpkg.com/htmx.org@2.0.0"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
${children}
`

type Todo = {
    id: number;
    content: string;
    completed: boolean;
}