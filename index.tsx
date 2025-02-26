import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'

const app = new Elysia().use(html())

.get('/', ({ html }) => 
    html(
        <BaseHtml>
            <body 
                class='flex w-full h-screen justify-center items-center'
                hx-get='/todos'
                hx-trigger='load'
                hx-swap="innerHTML"
            />
        </BaseHtml>
    )
)

.post('/clicked', () => <div class='text-blue-500'>im from the server</div>)

.get('/todos', () => <TodoList todos={db} />)

.post('/todos/toggle/:id',
    ({ params }) => {
        const todo = db.find((todo) => todo.id === params.id)
        if (todo) {
            todo.completed = !todo.completed 
            return <TodoItem {...todo} />
        }
    },
    {
        params: t.Object({
            id: t.Numeric()
        })
    }
)

.listen(3000)




// frontend

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

const db: Todo[] = [
    {id: 1, content: 'learn elysia', completed: false},
    {id: 2, content: 'learn java', completed: false},
]

function TodoItem({ content, completed, id}: Todo) {
    return (
        <div class='flex flex-row space-x-3'>
            <p>{content}</p>
            <input 
                type='checkbox' 
                checked={completed} 
                hx-post={`/todos/toggle/${id}`}
                hx-target='closest div'
                hx-swap='outerHTML'
            />
            <button class='text-red-500'>X</button>
        </div>
    )
}

function TodoList({ todos }: { todos: Todo[] }) {
    return (
        <div>
            {todos.map((todo) => (
                <TodoItem {...todo} />
            ))}
        </div>
    )
}