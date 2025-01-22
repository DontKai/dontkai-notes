import { HTML_Nav } from './routes/HTML'
import { CSS_Nav } from './routes/CSS'
import { JavaScript_Nav } from './routes/JavaScript'
import { TypeScript_Nav } from './routes/TypeScript'
import { Vue_Nav } from './routes/Vue'
import { Components_Nav } from './routes/Components'
import { Plugins_Nav } from './routes/Plugins'
import { Others_Nav } from './routes/Others'

export default [
    { text: '主页', link: '/' },
    {
        text: '前端',
        items: [HTML_Nav, CSS_Nav, JavaScript_Nav, TypeScript_Nav, Vue_Nav, Components_Nav, Plugins_Nav, Others_Nav]
    }
]
