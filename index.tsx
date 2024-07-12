import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'

const app = new Elysia().use(html())

.get('/', ({ html }) => 
    html(
        <BaseHtml>
            <h1>hello world</h1>
        </BaseHtml>
    )
)
.listen(3000)

const BaseHtml = ({ children }: elements.Children) => `
<DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elysia</title>
</head>
${children}
`