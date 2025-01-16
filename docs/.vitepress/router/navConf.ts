import { HTML_Nav } from './routes/HTML'
import { CSS_Nav } from './routes/CSS'
import { JavaScript_Nav } from './routes/JavaScript'
import { TypeScript_Nav } from './routes/TypeScript'
import { Canvas_Nav } from './routes/Canvas'
import { Vue_Nav } from './routes/Vue'
import { Components_Nav } from './routes/Components'
import { Animation_Nav } from './routes/Animation'
import { Plugins_Nav } from './routes/Plugins'
import { Others_Nav } from './routes/Others'
import { Git_Nav } from './routes/Git'

export default [
    { text: '主页', link: '/' },
    {
        text: '前端',
        items: [
            HTML_Nav,
            CSS_Nav,
            JavaScript_Nav,
            TypeScript_Nav,
            Canvas_Nav,
            Vue_Nav,
            Components_Nav,
            Animation_Nav,
            Plugins_Nav,
            Others_Nav,
            Git_Nav
        ]
    }
]
